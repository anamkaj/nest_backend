import { PrismaService } from 'src/db/prisma.service'
import { GetParamProduct } from './dto/product.dto'
import { Injectable } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'
import { sortFnProduct } from '../helper/sortFn'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  // Получение количества товаров в группу и минимальной + максимальной цены
  async getAllProductNotFilter(id: number) {
    const level = {
      one: {
        parentCategory: {
          parentCategory: {
            parentCategory: {
              id: Number(id),
            },
          },
        },
      },
      two: {
        parentCategory: {
          parentCategory: {
            id: Number(id),
          },
        },
      },
      three: {
        parentCategory: {
          id: Number(id),
        },
      },

      category: {
        id: Number(id),
      },
    }
    const getAllProductNotFilter = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: level.one,
          },
          {
            category: level.two,
          },

          {
            category: level.three,
          },
          {
            category: level.category,
          },
        ],
      },
    })
    const product = await getAllProductNotFilter
    const length: number = product.length
    const maxPrice: number = Math.max.apply(
      Math,
      product.map((x) => x.price),
    )
    const minPrice: number = Math.min.apply(
      Math,
      product.map((x) => x.price),
    )
    return JSON.stringify({ length, maxPrice, minPrice })
  }

  async sortFilter(body: GetParamProduct) {
    const brand = body.brand.split(',')
    const obj: { [key: string]: string[] } = {}
    const _ = body.paramFilter.split('f_').map((x) => {
      if (x !== '') {
        // Формирования ключа и параметров фильтра
        const key = x.split('_vl_')
        const value = key
          .slice(1)
          .map((g) => g.split('q_'))
          .flat()
          .slice(1)

        // Удаление и замена знаков "+" и ","

        const result = value.map((x) => {
          const strArray: string[] = []
          let regex = /\§/g
          for (let str of x) {
            strArray.push(str === '§' ? str.replace(regex, '+') : str)
          }
          let resultString = strArray.join('')
          if (x.endsWith(',')) {
            const delComma = resultString.slice(0, resultString.length - 1)
            return delComma
          }
          return resultString
        })
        obj[key[0]] = result
      }
    })

    const level = {
      one: {
        parentCategory: {
          parentCategory: {
            parentCategory: {
              id: Number(body.id),
            },
          },
        },
      },
      two: {
        parentCategory: {
          parentCategory: {
            id: Number(body.id),
          },
        },
      },
      three: {
        parentCategory: {
          id: Number(body.id),
        },
      },

      category: {
        id: Number(body.id),
      },
    }

    const prisma = new PrismaClient().$extends({
      query: {
        product: {
          async findMany({ model, operation, args, query }) {
            const product = (args.where = {
              OR: [
                {
                  category: level.category,
                  ShortParam: {
                    every: {
                      OR: [
                        {
                          key: {
                            mode: Prisma.QueryMode.insensitive,
                            equals: 'Матрица',
                          },
                          AND: {
                            value: {
                              mode: Prisma.QueryMode.insensitive,
                              equals: '1/2.7  2 мп progressive cmos',
                            },
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  category: level.one,
                  ShortParam: {
                    every: {
                      OR: [
                        {
                          key: {
                            mode: Prisma.QueryMode.insensitive,
                            equals: 'Матрица',
                          },
                          value: {
                            mode: Prisma.QueryMode.insensitive,
                            equals: '1/2.7  2 мп progressive cmos',
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  category: level.two,
                  ShortParam: {
                    every: {
                      OR: [
                        {
                          key: {
                            mode: Prisma.QueryMode.insensitive,
                            equals: 'Матрица',
                          },
                          value: {
                            mode: Prisma.QueryMode.insensitive,
                            equals: '1/2.7  2 мп progressive cmos',
                          },
                        },
                      ],
                    },
                  },
                },
                {
                  category: level.three,
                  ShortParam: {
                    every: {
                      OR: [
                        {
                          key: {
                            mode: Prisma.QueryMode.insensitive,
                            equals: 'Матрица',
                          },
                          value: {
                            mode: Prisma.QueryMode.insensitive,
                            equals: '1/2.7  2 мп progressive cmos',
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            })
            const shortParam = (args.include = {
              ShortParam: {},
            })

            return query(args)
          },
        },
      },
    })
    const result = await prisma.product.findMany()

    const test = new PrismaClient().$queryRaw`with recursive Children as (
        select c."name"  , c.id  ,c."parentId" 
        from "Category" c
        where c.id  =5
        union 
        select c."name"  , c.id  ,c."parentId" 
        from Children ch
        join "Category" c on c."parentId" = ch.id
        )
        select distinct p.id , p.title, p."categoryId", ch."parentId",p.brand,sp."key" , sp.value 
        from "Product" p 
        join Children ch on p."categoryId" = ch.id
        ::boolean`

    return test
  }

  // Основной роут для каталога товаров
  async sortByParam(body: GetParamProduct) {
    const brand = body.brand.split(',')
    const sort = body.sortParams || 'popularity_desc'
    const obj = sortFnProduct(body.paramFilter)

    const level = {
      one: {
        parentCategory: {
          parentCategory: {
            parentCategory: {
              id: Number(body.id),
            },
          },
        },
      },
      two: {
        parentCategory: {
          parentCategory: {
            id: Number(body.id),
          },
        },
      },
      three: {
        parentCategory: {
          id: Number(body.id),
        },
      },

      category: {
        id: Number(body.id),
      },
    }
    const price = {
      lte: Number(body.priceMax),
      gte: Number(body.priceMin),
    }
    // фильтрация товаров по параметрам
    const paramSearchArray = Object.values(obj).map((x, i) => ({
      ShortParam: {
        some: {
          AND: x
            .map((v) => ({
              AND: {
                key: {
                  mode: Prisma.QueryMode.insensitive,
                  equals: Object.keys(obj)[i],
                },
                value: {
                  mode: Prisma.QueryMode.insensitive,
                  equals: v,
                },
              },
            }))
            .flat(),
        },
      },
    }))

    const prisma = new PrismaClient().$extends({
      query: {
        product: {
          async findMany({ args, query }) {
            const product = (args.where = {
              OR: [
                {
                  category: level.one,
                  price: price,
                  brand:
                    body.brand.length !== 0
                      ? { in: brand, mode: 'insensitive' }
                      : {
                          contains: '',
                        },
                  AND: paramSearchArray,
                },
                {
                  category: level.two,
                  price: price,
                  brand:
                    body.brand.length !== 0
                      ? { in: brand, mode: 'insensitive' }
                      : {
                          contains: '',
                        },
                  AND: paramSearchArray,
                },
                {
                  category: level.three,
                  price: price,
                  brand:
                    body.brand.length !== 0
                      ? { in: brand, mode: 'insensitive' }
                      : {
                          contains: '',
                        },
                  AND: paramSearchArray,
                },
                {
                  category: level.category,
                  price: price,
                  brand:
                    body.brand.length !== 0
                      ? { in: brand, mode: 'insensitive' }
                      : {
                          contains: '',
                        },
                  AND: paramSearchArray,
                },
              ],
            })
            const shortParam = (args.include = {
              ShortParam: {},
            })

            const sortFilter = (args.orderBy =
              sort == 'popularity_desc'
                ? { watchProduct: 'desc' }
                : sort == 'price_asc'
                  ? { price: 'asc' }
                  : sort == 'price_desc'
                    ? { price: 'desc' }
                    : sort == 'rating_desc'
                      ? { rating: 'desc' }
                      : sort == 'rewives_desc' && { countReviews: 'desc' })

            const skip = (args.skip = Number(body.skip))
            const take = (args.take = Number(body.take))

            return query(args)
          },
        },
      },
    })

    const result = await prisma.product.findMany()

    return result
  }

  // Получение одного товара
  async oneProduct(body: GetParamProduct) {
    const oneProduct = this.prisma.product.findMany({
      where: {
        id: Number(body.id),
      },
      include: {
        FullParam: {},
        ShortParam: {},
      },
    })

    return oneProduct
  }

  async popularProduct() {
    const popularProduct = this.prisma.product.findMany({
      orderBy: {
        watchProduct: 'desc',
      },
      take: 12,
    })

    return popularProduct
  }

  async allProductBySiteMap() {
    const allProduct = this.prisma.product.findMany({})

    return allProduct
  }
}
