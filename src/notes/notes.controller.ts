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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../users/requestWithUser.interface';
import { NoteEntity } from './entities/note.entity';
import { FindAllNotesDto } from './dto/find-all-notes.dto';

@ApiTags('notes')
@ApiBearerAuth()
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    return new NoteEntity(
      await this.notesService.create(req.user.id, createNoteDto),
    );
  }

  @Get()
  @ApiQuery({ name: 'startedAt', required: false })
  async findAll(@Query() params: FindAllNotesDto, @Req() req: RequestWithUser) {
    const notes = await this.notesService.findAll(
      req.user.id,
      params.startedAt ?? undefined,
    );
    return notes.map((note) => new NoteEntity(note));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const note = await this.notesService.findOne(+id);
    if (note.user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else return new NoteEntity(note);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req: RequestWithUser,
  ) {
    const note = await this.notesService.findOne(+id);
    if (note.userId != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const note = await this.notesService.findOne(+id);
    if (note.userId != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else return this.notesService.remove(+id);
  }
}
