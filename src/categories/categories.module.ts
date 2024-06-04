import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [CategoriesService],
  exports: [CategoriesService],
  imports: [PrismaModule],
})
export class CategoriesModule {}
