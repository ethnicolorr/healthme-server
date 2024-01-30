import { Controller, Get } from '@nestjs/common';
import { AdvicesService } from './advices.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/public';

@ApiTags('advices')
@Controller('advices')
export class AdvicesController {
  constructor(private readonly advicesService: AdvicesService) {}

  @Get()
  @Public()
  findAll() {
    return this.advicesService.findAll();
  }

  @Get('/random')
  @Public()
  findRandom() {
    return this.advicesService.findRandom();
  }
}
