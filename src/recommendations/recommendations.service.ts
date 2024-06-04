import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  findAllByCategories(userCategories: Category[]) {
    return this.prisma.recommendation.findMany({
      where: {
        OR: [
          { categoryId: null },
          {
            categoryId: {
              in: userCategories.map((category) => category.id),
            },
          },
        ],
      },
      include: { category: true },
    });
  }
}
