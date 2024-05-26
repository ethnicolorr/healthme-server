import { Module } from '@nestjs/common';
import { ProceduresService } from './procedures.service';
import { ProceduresController } from './procedures.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProceduresController],
  providers: [ProceduresService],
  imports: [PrismaModule],
})
export class ProceduresModule {}
