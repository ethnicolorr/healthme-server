import { ApiProperty } from '@nestjs/swagger';
import { Procedure, ProcedureType } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

export class ProcedureEntity implements Procedure {
  constructor({ user, ...data }: Partial<ProcedureEntity>) {
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
  type: ProcedureType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastVisit: Date;
}
