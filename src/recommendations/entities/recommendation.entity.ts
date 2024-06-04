import { ProcedureType, Recommendation } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { CategoryEntity } from '../../categories/entities/category.entity';

export class RecommendationEntity implements Recommendation {
  @ApiProperty()
  id: number;

  @ApiProperty()
  type: ProcedureType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  frequency: number;

  @Exclude()
  @ApiProperty()
  categoryId: number;

  @Type(() => CategoryEntity)
  @ApiProperty()
  category: CategoryEntity;
}
