import { ApiProperty } from '@nestjs/swagger';
import { Appointment, ProcedureType } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude, Type } from 'class-transformer';

export class AppointmentEntity implements Appointment {
  @ApiProperty()
  id: number;

  @Exclude()
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @Type(() => UserEntity)
  user: UserEntity;

  @ApiProperty()
  name: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  type: ProcedureType;

  @ApiProperty()
  startedAt: Date;
}
