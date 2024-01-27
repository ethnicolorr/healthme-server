import { Module } from '@nestjs/common';
import { AdvicesService } from './advices.service';
import { AdvicesController } from './advices.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AdvicesController],
  providers: [AdvicesService],
  imports: [PrismaModule],
})
export class AdvicesModule {}
