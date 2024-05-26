import { IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindAllNotesDto {
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @ApiProperty()
  startedAt?: Date | null;
}
