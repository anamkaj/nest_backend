import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class UpdateCountViewDto {
  @IsNumber()
  id: number
}

export class UpdateCountRatingDto {
  @IsNumber()
  id: number
}
