import { ApiProperty } from '@nestjs/swagger';
import { Note, NoteType } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude, Type } from 'class-transformer';

export class NoteEntity implements Note {
  @ApiProperty()
  id: number;

  @Exclude()
  @ApiProperty()
  userId: number;

  @Type(() => UserEntity)
  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  name: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  type: NoteType;

  @ApiProperty()
  startedAt: Date;
}
