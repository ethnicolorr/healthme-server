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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../users/requestWithUser.interface';
import { NoteEntity } from './entities/note.entity';

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
  async findAll(@Req() req: RequestWithUser) {
    const notes = await this.notesService.findAll(req.user.id);
    return notes.map((note) => new NoteEntity(note));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new NoteEntity(await this.notesService.findOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
