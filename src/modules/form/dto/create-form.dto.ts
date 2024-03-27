import { Type } from 'class-transformer'
import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator'

class DataCart {
  title: string
  price: number
  count: number
  sale: number
}

class CreateFormDto {
  // @IsInt({ message: 'article - должен быть типом Int' })
  article: number
  title: string
  // @IsInt({ message: 'price - должен быть типом Int' })
  price: number
  @IsInt({ message: 'tel - должен быть типом Int' })
  phone: number
  name: string
  email: string
  // @IsInt({ message: 'id - должен быть типом Int' })
  id: number
  data?: DataCart[]
}

export class DtoDataForm {
  @Type(() => CreateFormDto)
  @ValidateNested()
  @IsNotEmpty()
  data: CreateFormDto
}
