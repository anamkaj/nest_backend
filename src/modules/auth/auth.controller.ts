import {
  Controller,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common'
import { UserService } from '../user/user.service'
import { UserDto } from '../user/dto/dto'
import { LoginDto } from './dto/auth.dto'
import { AuthService } from './auth.service'
import { RefreshJwtGuard } from './guards/refresh.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/registration')
  @HttpCode(200)
  async registerUser(@Body() data: UserDto) {
    return this.userService.create(data)
  }
  @Post('/login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    console.log(data)
    return await this.authService.login(data)
  }

  @UseGuards(RefreshJwtGuard)
  @Post('/refresh')
  @HttpCode(200)
  async refreshToken(@Req() req) {
    return await this.authService.refreshToken(req.user)
  }
}
