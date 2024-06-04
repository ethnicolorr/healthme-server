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
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../users/requestWithUser.interface';
import { AppointmentEntity } from './entities/appointment.entity';
import { FindAllAppointmentsDto } from './dto/find-all-appointments.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('appointments')
@ApiBearerAuth()
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return plainToInstance(
      AppointmentEntity,
      await this.appointmentsService.create(req.user.id, createAppointmentDto),
    );
  }

  @Get()
  @ApiQuery({ name: 'startedAt', required: false })
  async findAll(
    @Req() req: RequestWithUser,
    @Query() params: FindAllAppointmentsDto,
  ) {
    const appointments = await this.appointmentsService.findAll(
      req.user.id,
      params.startedAt ?? undefined,
    );
    return appointments.map((appointment) =>
      plainToInstance(AppointmentEntity, appointment),
    );
  }

  @Get('nearest')
  async findNearest(@Req() req: RequestWithUser) {
    const currentDate = new Date();
    currentDate.setMinutes(
      currentDate.getMinutes() - currentDate.getTimezoneOffset(),
    );
    const appointments = await this.appointmentsService.findNearest(
      req.user.id,
      currentDate,
    );
    return appointments.map((appointment) =>
      plainToInstance(AppointmentEntity, appointment),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const appointment = await this.appointmentsService.findOne(+id);
    if (appointment.user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      return plainToInstance(AppointmentEntity, appointment);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Req() req: RequestWithUser,
  ) {
    const appointment = await this.appointmentsService.findOne(+id);
    if (appointment.user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      const appointment = await this.appointmentsService.update(
        +id,
        updateAppointmentDto,
      );

      return plainToInstance(AppointmentEntity, appointment);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const appointment = await this.appointmentsService.findOne(+id);
    if (appointment.user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      return this.appointmentsService.remove(+id);
    }
  }
}
