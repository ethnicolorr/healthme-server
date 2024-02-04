import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
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
  @MaxLength(64)
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  @IsOptional()
  comment: string;

  @ApiProperty({ enum: NoteType })
  @IsEnum(NoteType)
  type: NoteType;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  temperature: number;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  @IsNotEmpty()
  startedAt: Date;
}
