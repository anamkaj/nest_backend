import { Type } from 'class-transformer'
import { IsNotEmpty, ValidateNested } from 'class-validator'

export class GetReviewDto {
  id: number
}

class CreateReviewDto {
  productId: number
  text: string
}

export class DtoDataReviews {
  @Type(() => CreateReviewDto)
  @ValidateNested()
  @IsNotEmpty()
  data: CreateReviewDto
}

export class LikeDto {
  commentId: number
}

export class DtoDataLike {
  @Type(() => LikeDto)
  @ValidateNested()
  @IsNotEmpty()
  data: LikeDto
}
