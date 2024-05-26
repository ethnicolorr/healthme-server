import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createAppointmentDto: CreateAppointmentDto) {
    createAppointmentDto.userId = userId;
    return this.prisma.appointment.create({
      data: createAppointmentDto,
      include: { user: true },
    });
  }

  findAll(userId: number, startedAt: Date) {
    return this.prisma.appointment.findMany({
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

  findNearest(userId: number, currentDate: Date) {
    return this.prisma.appointment.findMany({
      where: { userId, startedAt: { gte: currentDate } },
      include: { user: true },
      orderBy: { startedAt: 'asc' },
      take: 2,
    });
  }

  findOne(id: number) {
    return this.prisma.appointment.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  remove(id: number) {
    return this.prisma.appointment.delete({ where: { id } });
  }
}
