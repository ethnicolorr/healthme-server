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
      include: { user: true },
    });
  }

  remove(id: number) {
    return this.prisma.procedure.delete({
      where: { id },
      include: { user: true },
    });
  }
}
