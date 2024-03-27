import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const token = this.extractTokenFromHeader(request)
    if (!token) throw new UnauthorizedException('Отсутствует токен')

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.jwtSecretKey,
      })
      request['user'] = payload
    } catch (error) {
      throw new UnauthorizedException('Ошибка авторизации')
    }

    return true
  }

  private extractTokenFromHeader(request: Request) {
    if (!request.headers.authorization) {
      return undefined
    }
    const [type, token] = request.headers.authorization.split(' ') ?? []

    return type === 'Bearer' ? token : undefined
  }
}
