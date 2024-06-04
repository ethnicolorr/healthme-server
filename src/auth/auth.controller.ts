import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { Public } from '../shared/decorators/public';
import { UserEntity } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() registerDto: RegisterDto) {
    return plainToInstance(
      UserEntity,
      await this.authService.create(registerDto),
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }
}
