export class ProductDto {
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
  FullParam: Param[]
  ShortParam: Param[]
}

export class Param {
  id: number
  key: string
  value: string
  productId: number
}

export class GetParamFilter {
  id: number
  priceMin: number
  priceMax: number
  brand: string
  paramFilter: string
}

export class GetParamProduct {
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
