import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  findOne(id: UUID) {
    return this.usuarioRepository.findOne({
      where: { id }
    });
  }

  async findOneByEmail(email: string) {
    return this.usuarioRepository.findOne({
      where: { email }
    });
  }
}
