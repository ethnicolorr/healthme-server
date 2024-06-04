import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { NotesModule } from './notes/notes.module';
import { ProceduresModule } from './procedures/procedures.module';
import { AuthModule } from './auth/auth.module';
import { AdvicesModule } from './advices/advices.module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AppointmentsModule,
    NotesModule,
    ProceduresModule,
    AuthModule,
    AdvicesModule,
    RecommendationsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
