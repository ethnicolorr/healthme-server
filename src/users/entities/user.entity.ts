import { ApiProperty } from '@nestjs/swagger';
import { User, UserPicture, Gender } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  birthDate: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  picture: UserPicture;

  @ApiProperty()
  gender: Gender;
}
