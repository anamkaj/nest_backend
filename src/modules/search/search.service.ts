import { Injectable } from '@nestjs/common'
import { SearchDto } from './dto/search.dto'
import { PrismaService } from 'src/db/prisma.service'

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async resultSearch(body: SearchDto) {
    const resultSearch = this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              startsWith: body.input,
              mode: 'insensitive',
            },
          },
          {
            title: {
              search: body.input,
              mode: 'insensitive',
            },
          },
          ,
        ],
      },

      take: 5,
    })

    return resultSearch
  }

  async resultArticle(body: SearchDto) {
    const resultArticle = this.prisma.product.findMany({
      where: {
        OR: [
          {
            article: Number(body.input),
          },
        ],
      },
      take: 5,
    })

    return resultArticle
  }
  async resultCategory(body: SearchDto) {
    const resultCategory = this.prisma.category.findMany({
      where: {
        OR: [
          {
            name: {
              search: body.input,
              mode: 'insensitive',
            },
          },
          {
            name: {
              startsWith: body.input,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: 6,
    })

    return resultCategory
  }
}
