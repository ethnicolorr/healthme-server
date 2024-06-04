import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Gender } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findAllByAgeAndGender(age: number, gender: Gender) {
    return this.prisma.category.findMany({
      where: {
        gender: { equals: gender },
        OR: [
          {
            ageLeft: { lte: age },
            ageRight: { gte: age },
          },
          {
            ageLeft: null,
            ageRight: { gte: age },
          },
          {
            ageLeft: { lte: age },
            ageRight: null,
          },
        ],
      },
    });
  }
}
