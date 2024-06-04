import { ApiProperty } from '@nestjs/swagger';
import { Category, Gender } from '@prisma/client';

export class CategoryEntity implements Category {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ageLeft: number;

  @ApiProperty()
  ageRight: number;

  @ApiProperty()
  gender: Gender;
}
