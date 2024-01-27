import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProcedureType } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
  userId: number;

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
  startedAt: Date;

  @IsString()
  @ApiProperty()
  @MaxLength(128)
  comment: string;
}
