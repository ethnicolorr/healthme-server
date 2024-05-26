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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../users/requestWithUser.interface';
import { NoteEntity } from './entities/note.entity';

@ApiTags('notes')
@ApiBearerAuth()
@Controller('users/:userId/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Param('userId') userId: string,
    @Body() createNoteDto: CreateNoteDto,
  ) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      return new NoteEntity(
        await this.notesService.create(req.user.id, createNoteDto),
      );
    }
  }

  @Get()
  async findAll(@Req() req: RequestWithUser, @Param('userId') userId: string) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      const notes = await this.notesService.findAll(req.user.id);
      return notes.map((note) => new NoteEntity(note));
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
      return new NoteEntity(await this.notesService.findOne(+id));
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Param('userId') userId: string,
    @Req() req: RequestWithUser,
  ) {
    if (Number(userId) != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else {
      return this.notesService.update(+id, updateNoteDto);
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
      return this.notesService.remove(+id);
    }
  }
}
