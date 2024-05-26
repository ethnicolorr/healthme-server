import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createNoteDto: CreateNoteDto) {
    createNoteDto.userId = userId;
    return this.prisma.note.create({
      data: createNoteDto,
      include: { user: true },
    });
  }

  findAll(userId: number, startedAt: Date) {
    return this.prisma.note.findMany({
      where: {
        userId,
        ...(startedAt && {
          startedAt: {
            gte: new Date(startedAt),
            lt: new Date(startedAt.setDate(startedAt.getDate() + 1)),
          },
        }),
      },
      include: { user: true },
    });
  }

  findOne(id: number) {
    return this.prisma.note.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
      include: { user: true },
    });
  }

  remove(id: number) {
    return this.prisma.note.delete({ where: { id }, include: { user: true } });
  }
}
