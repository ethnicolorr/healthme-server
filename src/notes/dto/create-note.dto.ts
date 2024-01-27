import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoteType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateNoteDto {
  userId: number;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  comment: string;

  @IsNotEmpty()
  @ApiProperty()
  type: NoteType;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  startedAt: Date;
}
