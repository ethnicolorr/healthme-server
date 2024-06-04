import { Controller, Get, Req } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { CategoriesService } from '../categories/categories.service';
import RequestWithUser from '../users/requestWithUser.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { RecommendationEntity } from './entities/recommendation.entity';

@ApiBearerAuth()
@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const today = new Date();
    let age = today.getFullYear() - req.user.birthDate.getFullYear();
    today.setFullYear(req.user.birthDate.getFullYear());
    if (today < req.user.birthDate) {
      age--;
    }

    const userCategories = await this.categoriesService.findAllByAgeAndGender(
      age,
      req.user.gender,
    );
    return plainToInstance(
      RecommendationEntity,
      this.recommendationsService.findAllByCategories(userCategories),
    );
  }
}
