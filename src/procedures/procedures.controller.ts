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
import { ProceduresService } from './procedures.service';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../users/requestWithUser.interface';
import { ProcedureEntity } from './entities/procedure.entity';
import { plainToInstance } from 'class-transformer';

@ApiTags('procedures')
@ApiBearerAuth()
@Controller('procedures')
export class ProceduresController {
  constructor(private readonly proceduresService: ProceduresService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createProcedureDto: CreateProcedureDto,
  ) {
    return plainToInstance(
      ProcedureEntity,
      await this.proceduresService.create(req.user.id, createProcedureDto),
    );
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const procedures = await this.proceduresService.findAll(req.user.id);
    return procedures.map((procedure) =>
      plainToInstance(ProcedureEntity, procedure),
    );
  }

  @Get('/schedule')
  async getSchedule(@Req() req: RequestWithUser) {
    const procedures = await this.proceduresService.findAll(req.user.id);
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + 1);
    const schedule = [];

    for (let i = 0; i < procedures.length; i++) {
      const p = procedures[i];
      const lastVisit = p.lastVisit;

      schedule.push(plainToInstance(ProcedureEntity, structuredClone(p)));

      while (lastVisit < targetDate) {
        lastVisit.setDate(p.lastVisit.getDate() + p.frequency);
        p.lastVisit = lastVisit;
        schedule.push(plainToInstance(ProcedureEntity, structuredClone(p)));
      }
    }

    schedule.sort((a, b) => (a.lastVisit > b.lastVisit ? 1 : -1));
    return schedule;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const procedure = await this.proceduresService.findOne(+id);
    if (procedure.user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else return plainToInstance(ProcedureEntity, procedure);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
    @Req() req: RequestWithUser,
  ) {
    const procedure = await this.proceduresService.findOne(+id);
    if (procedure.user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else
      return plainToInstance(
        ProcedureEntity,
        this.proceduresService.update(+id, updateProcedureDto),
      );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const procedure = await this.proceduresService.findOne(+id);
    if (procedure.user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else
      return plainToInstance(
        ProcedureEntity,
        this.proceduresService.remove(+id),
      );
  }
}
