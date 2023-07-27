import { Type } from 'class-transformer'
import { ValidateNested, IsNotEmpty } from 'class-validator'

export class SearchDto {
  @IsNotEmpty()
  input: string
}
