import { IsDate, IsEnum, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProcedureType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  userId: number;

  @IsString()
  @ApiProperty()
  @MaxLength(25)
  name: string;

  @ApiProperty({ enum: ProcedureType })
  @IsEnum(ProcedureType)
  type: ProcedureType;

  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  startedAt: Date;

  @IsString()
  @ApiProperty()
  @MaxLength(100)
  comment: string;
}
