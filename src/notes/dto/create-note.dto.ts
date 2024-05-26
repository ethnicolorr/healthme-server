import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NoteType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateNoteDto {
  constructor(partial: Partial<CreateNoteDto>) {
    Object.assign(this, partial);
    this.name = this.name || 'Температура';
  }

  userId: number;

  @IsString()
  @ApiProperty()
  @MaxLength(25)
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  @MaxLength(100)
  @IsOptional()
  comment: string;

  @ApiProperty({ enum: NoteType })
  @IsEnum(NoteType)
  type: NoteType;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  @IsNotEmpty()
  startedAt: Date;
}
