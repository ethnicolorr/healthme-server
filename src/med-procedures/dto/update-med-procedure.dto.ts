import { PartialType } from '@nestjs/swagger';
import { CreateMedProcedureDto } from './create-med-procedure.dto';

export class UpdateMedProcedureDto extends PartialType(CreateMedProcedureDto) {}
