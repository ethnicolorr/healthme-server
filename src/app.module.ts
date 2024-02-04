import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotesModule } from './notes/notes.module';
import { MedProceduresModule } from './med-procedures/med-procedures.module';
import { AuthModule } from './auth/auth.module';
import { AdvicesModule } from './advices/advices.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AppointmentsModule,
    NotesModule,
    MedProceduresModule,
    AuthModule,
    AdvicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
