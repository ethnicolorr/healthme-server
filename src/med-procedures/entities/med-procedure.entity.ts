import { ApiProperty } from '@nestjs/swagger';
import { MedProcedure, MedProcedureType } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

export class MedProcedureEntity implements MedProcedure {
  constructor({ user, ...data }: Partial<MedProcedureEntity>) {
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
  frequency: number;

  @ApiProperty()
  type: MedProcedureType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastVisit: Date;
}
