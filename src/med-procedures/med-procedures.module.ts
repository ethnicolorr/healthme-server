import { Module } from '@nestjs/common';
import { MedProceduresService } from './med-procedures.service';
import { MedProceduresController } from './med-procedures.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [MedProceduresController],
  providers: [MedProceduresService],
  imports: [PrismaModule],
})
export class MedProceduresModule {}
