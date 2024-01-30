import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdvicesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.advice.findMany();
  }

  findRandom() {
    return this.prisma.$queryRaw`SELECT * FROM Advice ORDER BY RAND() LIMIT 1`;
  }
}
