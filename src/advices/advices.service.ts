import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdvicesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.advice.findMany();
  }
}
