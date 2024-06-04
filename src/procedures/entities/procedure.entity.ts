import { ApiProperty } from '@nestjs/swagger';
import { Procedure, ProcedureType } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude, Type } from 'class-transformer';

export class ProcedureEntity implements Procedure {
  @ApiProperty()
  id: number;

  @Exclude()
  @ApiProperty()
  userId: number;

  @Type(() => UserEntity)
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
