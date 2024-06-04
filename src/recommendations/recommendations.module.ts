import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoriesModule } from '../categories/categories.module';
import { RecommendationsController } from './recommendations.controller';

@Module({
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  imports: [PrismaModule, CategoriesModule],
})
export class RecommendationsModule {}
