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
import { ProceduresService } from './procedures.service';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../users/requestWithUser.interface';
import { ProcedureEntity } from './entities/procedure.entity';

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
    return new ProcedureEntity(
      await this.proceduresService.create(
        req.user.id,
        createProcedureDto,
      ),
    );
  }

  @Get()
  async findAll(@Req() req: RequestWithUser) {
    const procedures = await this.proceduresService.findAll(req.user.id);
    return procedures.map(
      (procedure) => new ProcedureEntity(procedure),
    );
  }

  @Get('/schedule')
  getSchedule(@Req() req: RequestWithUser) {
    return this.proceduresService.findOrder(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new ProcedureEntity(await this.proceduresService.findOne(+id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProcedureDto: UpdateProcedureDto,
  ) {
    return this.proceduresService.update(+id, updateProcedureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proceduresService.remove(+id);
  }
}
