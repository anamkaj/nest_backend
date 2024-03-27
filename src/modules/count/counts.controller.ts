import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common'
import { CountsService } from './counts.service'
import { UpdateCountViewDto } from './dto/update-count.dto'

@Controller()
export class CountsController {
  constructor(private readonly countsService: CountsService) {}

  @Post('/countInc')
  @HttpCode(200)
  async countViewInc(@Body() body: UpdateCountViewDto) {
    const { id } = body
    return this.countsService.countViewInc(id)
  }
  @Post('/ratingInc')
  @HttpCode(200)
  async countRatingInc(@Body() body: UpdateCountViewDto) {
    const { id } = body
    return this.countsService.countRatingInc(id)
  }
}
