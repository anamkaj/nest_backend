import { Controller, Get, HttpCode, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtGuard } from '../auth/guards/jwt.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  @HttpCode(200)
  async findById(@Param('id') id: number) {
    return await this.userService.findById(id)
  }
}
