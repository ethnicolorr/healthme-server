import { ApiProperty } from '@nestjs/swagger';
import { Appointment, ProcedureType } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

export class AppointmentEntity implements Appointment {
  constructor({ user, ...data }: Partial<AppointmentEntity>) {
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
  name: string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  type: ProcedureType;

  @ApiProperty()
  startedAt: Date;
}
