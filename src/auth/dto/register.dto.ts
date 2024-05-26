import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
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
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(50)
  name: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  birthDate: Date;

  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  gender: Gender;
}
