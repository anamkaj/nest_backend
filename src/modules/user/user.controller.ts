import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtGuard } from '../auth/guards/jwt.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('userProfile')
  @HttpCode(200)
  async userProfile(@Query() data: { email: string }) {
    const { email } = data
    return await this.userService.userProfile(email)
  }
}
