import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import RequestWithUser from './requestWithUser.interface';
import { plainToInstance } from 'class-transformer';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const user = await this.usersService.findOne(+id);
    if (user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else return plainToInstance(UserEntity, user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.findOne(+id);
    if (user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else
      return plainToInstance(
        UserEntity,
        await this.usersService.update(+id, updateUserDto),
      );
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (user.id != req.user.id) {
      throw new ForbiddenException(
        `Операция недоступна для данного пользователя`,
      );
    } else
      return plainToInstance(
        UserEntity,
        await this.usersService.remove(req.user.id),
      );
  }
}
