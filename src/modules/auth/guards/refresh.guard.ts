import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { PayloadRefreshToken } from '../dto/guard.type'

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const token: string = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException('Отсутствует токен')

    try {
      const payload: PayloadRefreshToken = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.jwtRefreshTokenKey,
        },
      )

      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException('Ошибка авторизации refreshToken')
    }

    return true
  }

  private extractTokenFromHeader(request: Request) {
    if (!request.headers.authorization) {
      return undefined
    }
    const [type, token] = request.headers.authorization.split(' ') ?? []

    return type === 'Refresh' ? token : undefined
  }
}
