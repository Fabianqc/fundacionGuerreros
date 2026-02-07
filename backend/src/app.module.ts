import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogModule } from './audit-log/audit-log.module';
import { AyudasTecnicasModule } from './ayudas-tecnicas/ayudas-tecnicas.module';
import { ConsultaModule } from './consulta/consulta.module';
import { ConsultaHasPatologiaModule } from './consulta_has_patologia/consulta_has_patologia.module';
import { DoctorModule } from './doctor/doctor.module';
import { DoctorHorarioModule } from './doctor-horario/doctor-horario.module';
import { DoctorHasEspecialidadesModule } from './doctor_has_especialidades/doctor_has_especialidades.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { ImgModule } from './img/img.module';
import { NucleoFamiliarModule } from './nucleo-familiar/nucleo-familiar.module';
import { PacienteModule } from './paciente/paciente.module';
import { PatologiaModule } from './patologia/patologia.module';
import { PersonasModule } from './personas/personas.module';
import { TipoAyudasModule } from './tipo-ayudas/tipo-ayudas.module';
import { UsuarioModule } from './usuario/usuario.module';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
  }), AuditLogModule, AyudasTecnicasModule, ConsultaModule, ConsultaHasPatologiaModule, DoctorModule, DoctorHorarioModule, DoctorHasEspecialidadesModule, EspecialidadesModule, ImgModule, NucleoFamiliarModule, PacienteModule, PatologiaModule, PersonasModule, TipoAyudasModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
