import { Body, Controller, Delete, Get, Patch, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import RequestWithUser from './requestWithUser.interface';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity })
  async findOne(@Req() req: RequestWithUser) {
    return new UserEntity(await this.usersService.findOne(req.user.id));
  }

  @Patch()
  @ApiCreatedResponse({ type: UserEntity })
  async update(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(
      await this.usersService.update(req.user.id, updateUserDto),
    );
  }

  @Delete()
  @ApiOkResponse({ type: UserEntity })
  async remove(@Req() req: RequestWithUser) {
    return new UserEntity(await this.usersService.remove(req.user.id));
  }
}
