import { FilterProductDto } from '../dto/filter.dto'

export const filterBrand = (brandArray: FilterProductDto[]) => {
  const brand = brandArray.map((x) => x.brand)
  const uniqueCount: { [key: string]: number } = {}
  for (const element of brand) {
    if (uniqueCount[element]) {
      uniqueCount[element] += 1
    } else {
      uniqueCount[element] = 1
    }
  }
  return uniqueCount
}
