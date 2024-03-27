import { Controller, Get, Post, Body, HttpCode, Query } from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { DtoDataLike, DtoDataReviews, GetReviewDto, LikeDto } from './dto/create-review.dto'

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/reviews')
  @HttpCode(200)
  async findAll(@Query() body: GetReviewDto) {
    return this.reviewsService.findAll(body)
  }

  @Post('/reviews')
  @HttpCode(200)
  async createReviews(@Body() body: DtoDataReviews) {
    return this.reviewsService.createReviews(body)
  }
  @Post('/likeInc')
  @HttpCode(200)
  async incrementsLike(@Body() body: DtoDataLike) {
    return this.reviewsService.incrementsLike(body)
  }

  @Post('/likeDec')
  @HttpCode(200)
  async decrementsLike(@Body() body: DtoDataLike) {
    return this.reviewsService.decrementsLike(body)
  }
  @Get('/reviewsAll')
  @HttpCode(200)
  async getAllReviews() {
    return this.reviewsService.getAllReviews()
  }
}
