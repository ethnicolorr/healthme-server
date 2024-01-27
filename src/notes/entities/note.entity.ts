import { ApiProperty } from '@nestjs/swagger';
import { Note, NoteType } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

export class NoteEntity implements Note {
  constructor({ user, ...data }: Partial<NoteEntity>) {
    Object.assign(this, data);
    this.user = new UserEntity(user);
  }

  @ApiProperty()
  id: number;

  @Exclude()
  @ApiProperty()
  userId: number;

  @ApiProperty()
  user: UserEntity;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  type: NoteType;

  @ApiProperty()
  startedAt: Date;
}
