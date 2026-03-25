import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NucleoFamiliar, Parentesco } from './entities/nucleo-familiar.entity';
import { Paciente } from '../paciente/entities/paciente.entity';
import { Persona } from '../personas/entities/persona.entity';

@Injectable()
export class NucleoFamiliarService {
  constructor(
    @InjectRepository(NucleoFamiliar)
    private readonly nucleoFamiliarRepo: Repository<NucleoFamiliar>,
    @InjectRepository(Paciente)
    private readonly pacienteRepo: Repository<Paciente>,
    @InjectRepository(Persona)
    private readonly personaRepo: Repository<Persona>,
  ) {}

  private getInverseParentesco(parentesco: Parentesco, gender: string): Parentesco {
    const isMale = gender === 'M';
    switch (parentesco) {
      case Parentesco.MADRE:
      case Parentesco.PADRE:
        return isMale ? Parentesco.HIJO : Parentesco.HIJA;
      case Parentesco.ESPOSO:
      case Parentesco.ESPOSA:
        return isMale ? Parentesco.ESPOSO : Parentesco.ESPOSA;
      case Parentesco.CONCUBINO:
      case Parentesco.CONCUBINA:
        return isMale ? Parentesco.CONCUBINO : Parentesco.CONCUBINA;
      case Parentesco.HIJO:
      case Parentesco.HIJA:
        return isMale ? Parentesco.PADRE : Parentesco.MADRE;
      case Parentesco.HERMANO:
      case Parentesco.HERMANA:
        return isMale ? Parentesco.HERMANO : Parentesco.HERMANA;
      case Parentesco.ABUELO:
      case Parentesco.ABUELA:
        return isMale ? Parentesco.NIETO : Parentesco.NIETA;
      case Parentesco.NIETO:
      case Parentesco.NIETA:
        return isMale ? Parentesco.ABUELO : Parentesco.ABUELA;
      case Parentesco.TIO:
      case Parentesco.TIA:
        return isMale ? Parentesco.SOBRINO : Parentesco.SOBRINA;
      case Parentesco.SOBRINO:
      case Parentesco.SOBRINA:
        return isMale ? Parentesco.TIO : Parentesco.TIA;
      case Parentesco.PRIMO:
      case Parentesco.PRIMA:
        return isMale ? Parentesco.PRIMO : Parentesco.PRIMA;
      case Parentesco.SUEGRO:
      case Parentesco.SUEGRA:
        return isMale ? Parentesco.YERNO : Parentesco.NUERA;
      case Parentesco.YERNO:
      case Parentesco.NUERA:
        return isMale ? Parentesco.SUEGRO : Parentesco.SUEGRA;
      case Parentesco.CUNADO:
      case Parentesco.CUNADA:
        return isMale ? Parentesco.CUNADO : Parentesco.CUNADA;
      default:
        return Parentesco.OTRO;
    }
  }

  async registerFamilyMembers(pacienteId: string, nucleoFamiliarData: { personaId: string, parentesco: string }[]) {
    if (!nucleoFamiliarData || nucleoFamiliarData.length === 0) return;

    const paciente = await this.pacienteRepo.findOne({
      where: { id: pacienteId as any },
      relations: ['persona']
    });

    if (!paciente) throw new BadRequestException('Paciente no encontrado');

    for (const data of nucleoFamiliarData) {
      await this.addRelation(paciente, data.personaId, data.parentesco as Parentesco);
    }
  }

  private async addRelation(paciente: Paciente, targetPersonaId: string, parentesco: Parentesco) {
    const targetPersona = await this.personaRepo.findOne({ where: { id: targetPersonaId as any } });
    if (!targetPersona) return;

    // 1. Direct Relation
    const existingDirect = await this.nucleoFamiliarRepo.findOne({
      where: { pacienteId: paciente.id as any, personaId: targetPersona.id as any }
    });
    
    if (!existingDirect) {
      const newRel = this.nucleoFamiliarRepo.create({
        pacienteId: paciente.id as any,
        personaId: targetPersona.id as any,
        parentesco,
      });
      await this.nucleoFamiliarRepo.save(newRel);
    }

    // 2. Inverse Relation
    const targetPaciente = await this.pacienteRepo.createQueryBuilder('paciente')
      .leftJoinAndSelect('paciente.persona', 'persona')
      .where('persona.UUID = :personaId', { personaId: targetPersona.id })
      .getOne();

    if (targetPaciente) {
      const inverseParentesco = this.getInverseParentesco(parentesco, paciente.persona.sexo);
      const existingInverse = await this.nucleoFamiliarRepo.findOne({
        where: { pacienteId: targetPaciente.id as any, personaId: paciente.persona.id as any }
      });
      if (!existingInverse) {
        const inverseRel = this.nucleoFamiliarRepo.create({
          pacienteId: targetPaciente.id as any,
          personaId: paciente.persona.id as any,
          parentesco: inverseParentesco
        });
        await this.nucleoFamiliarRepo.save(inverseRel);
      }
    }

    // 3. Sibling Inference
    if (parentesco === Parentesco.PADRE || parentesco === Parentesco.MADRE) {
      const siblingRels = await this.nucleoFamiliarRepo.createQueryBuilder('nf')
        .where('nf.Personas_UUID = :personaId', { personaId: targetPersona.id })
        .andWhere('nf.Paciente_UUID != :pacienteId', { pacienteId: paciente.id })
        .andWhere('nf.Parentesco IN (:...parentescos)', { parentescos: [Parentesco.PADRE, Parentesco.MADRE] })
        .getMany();

      for (const sibRel of siblingRels) {
        const siblingPaciente = await this.pacienteRepo.createQueryBuilder('paciente')
           .leftJoinAndSelect('paciente.persona', 'persona')
           .where('paciente.UUID = :sibId', { sibId: sibRel.pacienteId })
           .getOne();
        
        if (siblingPaciente) {
           const isSiblingMale = siblingPaciente.persona.sexo === 'M';
           const sibParentesco = isSiblingMale ? Parentesco.HERMANO : Parentesco.HERMANA;
           
           const existingSib = await this.nucleoFamiliarRepo.findOne({
             where: { pacienteId: paciente.id as any, personaId: siblingPaciente.persona.id as any }
           });
           if (!existingSib) {
              await this.nucleoFamiliarRepo.save(this.nucleoFamiliarRepo.create({
                pacienteId: paciente.id as any, 
                personaId: siblingPaciente.persona.id as any,
                parentesco: sibParentesco
              }));
           }

           const amIMale = paciente.persona.sexo === 'M';
           const myParentesco = amIMale ? Parentesco.HERMANO : Parentesco.HERMANA;
           const existingInvSib = await this.nucleoFamiliarRepo.findOne({
             where: { pacienteId: siblingPaciente.id as any, personaId: paciente.persona.id as any }
           });
           if (!existingInvSib) {
              await this.nucleoFamiliarRepo.save(this.nucleoFamiliarRepo.create({
                pacienteId: siblingPaciente.id as any,
                personaId: paciente.persona.id as any,
                parentesco: myParentesco
              }));
           }
        }
      }
    }
  }

  async findByPaciente(pacienteId: string) {
    return this.nucleoFamiliarRepo.find({
      where: { paciente: { id: pacienteId as any } },
      relations: ['persona']
    });
  }

  async remove(pacienteId: string, personaId: string) {
    const existingRel = await this.nucleoFamiliarRepo.createQueryBuilder('nf')
      .leftJoinAndSelect('nf.paciente', 'paciente')
      .leftJoinAndSelect('paciente.persona', 'pacientePersona')
      .where('nf.Paciente_UUID = :pacienteId', { pacienteId })
      .andWhere('nf.Personas_UUID = :personaId', { personaId })
      .getOne();

    if (!existingRel) return;

    // 1. Remove direct relation
    await this.nucleoFamiliarRepo.delete({ pacienteId: pacienteId as any, personaId: personaId as any });

    // 2. Clear inverse relation
    const targetPaciente = await this.pacienteRepo.createQueryBuilder('paciente')
      .leftJoinAndSelect('paciente.persona', 'persona')
      .where('persona.UUID = :personaId', { personaId })
      .getOne();

    if (targetPaciente) {
      const inverseParentesco = this.getInverseParentesco(existingRel.parentesco, existingRel.paciente.persona.sexo);
      await this.nucleoFamiliarRepo.delete({
        pacienteId: targetPaciente.id as any,
        personaId: existingRel.paciente.persona.id as any,
        parentesco: inverseParentesco
      });
    }
  }
}
