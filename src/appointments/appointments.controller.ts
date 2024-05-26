import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../users/requestWithUser.interface';
import { AppointmentEntity } from './entities/appointment.entity';

@ApiTags('appointments')
@ApiBearerAuth()
@Controller('users/:userId/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Param('userId') userId: string,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    }
    else {
      return new AppointmentEntity(
        await this.appointmentsService.create(req.user.id, createAppointmentDto),
      );
    }
  }

  @Get()
  async findAll(
    @Req() req: RequestWithUser,
    @Param('userId') userId: string,
  ) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    }
    else {
      const appointments = await this.appointmentsService.findAll(req.user.id);
      return appointments.map(
        (appointment) => new AppointmentEntity(appointment),
      );
    }
  }

  @Get('nearest')
  async findNearest(
    @Req() req: RequestWithUser,
    @Param('userId') userId: string,
  ) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    }
    else {
      const currentDate = new Date();
      currentDate.setMinutes(
        currentDate.getMinutes() - currentDate.getTimezoneOffset(),
      );
      const appointments = await this.appointmentsService.findNearest(
        req.user.id,
        currentDate,
      );
      return appointments.map(
        (appointment) => new AppointmentEntity(appointment),
      );
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Req() req: RequestWithUser,
  ) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      return new AppointmentEntity(await this.appointmentsService.findOne(+id));
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Param('userId') userId: string,
    @Req() req: RequestWithUser,
  ) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      return this.appointmentsService.update(+id, updateAppointmentDto);
    }
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Req() req: RequestWithUser,
  ) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      return this.appointmentsService.remove(+id);
    }
  }
}
