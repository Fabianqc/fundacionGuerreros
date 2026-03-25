import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuditLogModule } from './audit-log/audit-log.module';
import { AuthModule } from './auth/auth.module';
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
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        schema: configService.get<string>('DB_SCHEMA'),
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuditLogModule,
    AuthModule,
    AyudasTecnicasModule,
    ConsultaModule,
    ConsultaHasPatologiaModule,
    DoctorModule,
    DoctorHorarioModule,
    DoctorHasEspecialidadesModule,
    EspecialidadesModule,
    ImgModule,
    NucleoFamiliarModule,
    PacienteModule,
    PatologiaModule,
    PersonasModule,
    TipoAyudasModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
