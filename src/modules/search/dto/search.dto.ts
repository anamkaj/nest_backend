import { Type } from 'class-transformer'
import { ValidateNested, IsNotEmpty } from 'class-validator'

export class SearchDto {
  @IsNotEmpty()
  input: string
}

export class SearchResultProduct {
  item: SearchData
  refIndex: number
}

export class SearchResultCategory {
  item: SearchCategory
  refIndex: number
}

export class SearchData {
  id: number
  title: string
  price: number
  imgLink: string[]
  altImg: string
  brand: string
  article: number
  imgFolder: string
}

export class SearchCategory {
  id: number
  name: string
  parentCategoryId: number
  img: string
  slug: string
  folderImg: string
}
