export class GetParamFilter {
  take: number
  id: number
  skip?: number
  filter: string
  priceMin: number
  priceMax: number
  brand: string
  paramFilter: string
  sortParams: string
}

export class ParamFilter {
  id: number
  key: string
  value: string
  productId: number
}

export class TypeAcc {
  id: number
  key: string
  value: string[]
}

export class FilterProductDto {
  id: number
  title: string
  type: string
  price: number
  descriptionOne: string
  imgLink: string[]
  altImg: string
  tag: string[]
  rating: number
  watchProduct: number
  inStock: boolean
  quantity: number
  discount: number
  brand: string
  article: number
  categoryId: number | null
  other: string[]
  warranty: number
  imgFolder: string | null
  countReviews: number | null
  buyAlready: number | null
  brandImg: string | null
}
