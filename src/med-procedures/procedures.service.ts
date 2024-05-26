import { Injectable } from '@nestjs/common';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProceduresService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createProcedureDto: CreateProcedureDto) {
    createProcedureDto.userId = userId;
    return this.prisma.procedure.create({
      data: createProcedureDto,
      include: { user: true },
    });
  }

  findAll(userId: number) {
    return this.prisma.procedure.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  findOrder(userId: number) {
    return this.prisma.$queryRaw`
        SELECT name, DATE_ADD(lastVisit, INTERVAL frequency DAY) date
        FROM procedures
        WHERE userId = ${userId} 
        ORDER BY 2
        `;
  }

  findOne(id: number) {
    return this.prisma.procedure.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, updateProcedureDto: UpdateProcedureDto) {
    return this.prisma.procedure.update({
      where: { id },
      data: updateProcedureDto,
    });
  }

  remove(id: number) {
    return this.prisma.procedure.delete({ where: { id } });
  }
}
