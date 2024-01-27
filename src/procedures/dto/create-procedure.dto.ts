import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProcedureType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateProcedureDto {
  userId: number;

  @IsInt()
  @ApiProperty()
  frequency: number;

  @IsString()
  @ApiProperty()
  @MaxLength(32)
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  type: ProcedureType;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  lastVisit: Date;
}
