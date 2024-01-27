import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '@prisma/client';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(256)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(64)
  name: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  birthDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  gender: Gender;
}
