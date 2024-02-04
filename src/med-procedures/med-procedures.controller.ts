import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { MedProceduresService } from './med-procedures.service';
import { CreateMedProcedureDto } from './dto/create-med-procedure.dto';
import { UpdateMedProcedureDto } from './dto/update-med-procedure.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../users/requestWithUser.interface';
import { MedProcedureEntity } from './entities/med-procedure.entity';

@ApiTags('procedures')
@ApiBearerAuth()
@Controller('procedures')
export class MedProceduresController {
  constructor(private readonly medProceduresService: MedProceduresService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createMedProcedureDto: CreateMedProcedureDto,
  ) {
    return new MedProcedureEntity(
      await this.medProceduresService.create(
        req.user.id,
        createMedProcedureDto,
      ),
    );
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const medProcedures = await this.medProceduresService.findAll(req.user.id);
    return medProcedures.map(
      (medProcedure) => new MedProcedureEntity(medProcedure),
    );
  }

  @Get('/schedule')
  getSchedule(@Req() req: RequestWithUser) {
    return this.medProceduresService.findOrder(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new MedProcedureEntity(await this.medProceduresService.findOne(+id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedProcedureDto: UpdateMedProcedureDto,
  ) {
    return this.medProceduresService.update(+id, updateMedProcedureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medProceduresService.remove(+id);
  }
}
