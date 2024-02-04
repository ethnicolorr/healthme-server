import { Injectable } from '@nestjs/common';
import { CreateMedProcedureDto } from './dto/create-med-procedure.dto';
import { UpdateMedProcedureDto } from './dto/update-med-procedure.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedProceduresService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createMedProcedureDto: CreateMedProcedureDto) {
    createMedProcedureDto.userId = userId;
    return this.prisma.medProcedure.create({
      data: createMedProcedureDto,
      include: { user: true },
    });
  }

  findAll(userId: number) {
    return this.prisma.medProcedure.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  findOrder(userId: number) {
    return this.prisma.$queryRaw`
        SELECT name, DATE_ADD(lastVisit, INTERVAL frequency DAY) date
        FROM medProcedure
        WHERE userId = ${userId} 
        ORDER BY 2
        `;
  }

  findOne(id: number) {
    return this.prisma.medProcedure.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, updateMedProcedureDto: UpdateMedProcedureDto) {
    return this.prisma.medProcedure.update({
      where: { id },
      data: updateMedProcedureDto,
    });
  }

  remove(id: number) {
    return this.prisma.medProcedure.delete({ where: { id } });
  }
}
