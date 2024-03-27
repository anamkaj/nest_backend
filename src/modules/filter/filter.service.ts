import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { sortFnProduct } from '../helper/sortFn'
import { GetParamFilter } from '../product/dto/product.dto'
import { Prisma, PrismaClient } from '@prisma/client'
import { filterParam } from './helper/filter.check.param'
import { filterBrand } from './helper/filter.check.brand'

@Injectable()
export class FilterService {
  constructor(private prisma: PrismaService) {}
  // ______________________________________________________________________
  // Получение всех параметров товаров для фильтра в каталоге

  async filterParamsProduct(body: GetParamFilter) {
    const brand = body.brand.split(',')
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

    //  Запрос на получения параметров только отфильтрованных продуктов
    const filterParamsProduct = new PrismaClient().$extends({
      query: {
        shortParam: {
          async findMany({ args, query }) {
            const product = (args.where = {
              Product: {
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
              },
            })

            return query(args)
          },
        },
      },
    })

    // ______________________________________________________________________
    // Получение названий и колличества брендов
    const brandFilter = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: level.one,
            price: price,
            brand:
              body.brand.length !== 0 ? { in: brand, mode: 'insensitive' } : {},
            AND: paramSearchArray,
          },
          {
            category: level.two,
            price: price,
            brand:
              body.brand.length !== 0 ? { in: brand, mode: 'insensitive' } : {},
            AND: paramSearchArray,
          },
          {
            category: level.three,
            price: price,
            brand:
              body.brand.length !== 0 ? { in: brand, mode: 'insensitive' } : {},
            AND: paramSearchArray,
          },
          {
            category: level.category,
            price: price,
            brand:
              body.brand.length !== 0 ? { in: brand, mode: 'insensitive' } : {},
            AND: paramSearchArray,
          },
        ],
      },
    })

    const brandArray = await brandFilter
    const someParams = await filterParamsProduct.shortParam.findMany()

    // ______________________________________________________________________

    const uniqueCount = filterBrand(brandArray)
    const someParamFilter = filterParam({ someParams, obj })

    const data = {
      all: '',
      some: someParamFilter,
      brand: uniqueCount,
      sumProduct: brandArray.length,
    }

    return data
  }
}
