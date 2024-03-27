import { Injectable } from '@nestjs/common'
import {
  SearchDto,
  SearchResultCategory,
  SearchResultProduct,
} from './dto/search.dto'
import { PrismaService } from 'src/db/prisma.service'
const Fuse = require('fuse.js')

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async resultData(body: SearchDto) {
    const resultDataSearch = await this.prisma.product.findMany({
      select: {
        id: true,
        title: true,
        article: true,
        brand: true,
        price: true,
        altImg: true,
        imgFolder: true,
        imgLink: true,
      },
    })
    const resultCategorySearch = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        img: true,
        parentCategoryId: true,
        slug: true,
        folderImg: true,
      },
    })

    const product = new Fuse(resultDataSearch, {
      includeScore: false,
      isCaseSensitive: false,
      keys: ['title', 'article'],
    })
    const category = new Fuse(resultCategorySearch, {
      includeScore: false,
      isCaseSensitive: false,
      keys: ['name'],
    })

    const productSearch: SearchResultProduct[] = product.search(body.input)
    const categorySearch: SearchResultCategory[] = category.search(body.input)
    const productResult = productSearch.map(({ item }) => item).slice(0, 20)
    const categoryResult = categorySearch.map(({ item }) => item).slice(0, 4)

    const data = { product: productResult, category: categoryResult }

    return data
  }
}
