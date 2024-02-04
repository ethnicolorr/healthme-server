import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MedProcedureType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateMedProcedureDto {
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
  type: MedProcedureType;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  lastVisit: Date;
}
