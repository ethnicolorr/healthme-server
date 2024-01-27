import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { roundsOfHashing } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(registerDto: RegisterDto) {
    registerDto.password = await bcrypt.hash(
      registerDto.password,
      roundsOfHashing,
    );
    try {
      return this.prisma.user.create({
        data: registerDto,
      });
    } catch (e) {
      console.log(e?.code);
    }
  }

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      throw new NotFoundException(
        `Пользователя с таким адресом электронной почты не существует`,
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль');
    }
    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
