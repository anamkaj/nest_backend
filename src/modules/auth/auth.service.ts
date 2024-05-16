import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginDto } from './dto/auth.dto'
import { UserService } from '../user/user.service'
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { PayloadRefreshToken } from './dto/guard.type'

const EXPIRE_TIME = 5 * 3600

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.validateUser(data)
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    }
    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '5h',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    }
  }
  async validateUser(data: LoginDto) {
    const user = await this.userService.findByEmail(data.email)

    if (user && (await compare(data.password, user.password))) {
      const { password, ...result } = user
      return result
    }

    throw new UnauthorizedException(
      'Ошибка авторизации: Проверьте Логин и Пароль',
    )
  }

  async refreshToken(user: PayloadRefreshToken) {
    const payload = {
      username: user.username,
      sub: user.sub,
    }
    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '5h',
          secret: process.env.jwtSecretKey,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.jwtRefreshTokenKey,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    }
  }
}
