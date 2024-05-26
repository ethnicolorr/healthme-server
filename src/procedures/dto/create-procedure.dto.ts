import { IsDate, IsEnum, IsInt, IsString, MaxLength } from 'class-validator';
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
  @MaxLength(25)
  name: string;

  @IsEnum(ProcedureType)
  @ApiProperty({ enum: ProcedureType })
  type: ProcedureType;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  lastVisit: Date;
}
