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

  findAll(userId: number) {
    return this.prisma.note.findMany({
      where: { userId },
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
    return this.prisma.note.update({ where: { id }, data: updateNoteDto });
  }

  remove(id: number) {
    return this.prisma.note.delete({ where: { id } });
  }
}
