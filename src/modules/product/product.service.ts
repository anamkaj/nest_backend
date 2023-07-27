import { PrismaService } from 'src/db/prisma.service'
import { GetParamProduct, ProductDto } from './dto/product.dto'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  //_____________________________________________________________
  // Получение всех продуктов (товаров)
  //_____________________________________________________________

  async getAllProduct(body: GetParamProduct) {
    const getAllProduct = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: Number(body.id),
                  },
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  id: Number(body.id),
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
          },
          {
            category: {
              id: Number(body.id),
            },
          },
        ],
      },
      take: Number(body.take) * Number(body.skip),
    })

    return getAllProduct
  }

  //_________________________________________
  // Роут фильтрацию из Хедера
  //_________________________________________

  async sortByPopularity(body: GetParamProduct) {
    const sortByPopularity = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: Number(body.id),
                  },
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  id: Number(body.id),
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
          },
          {
            category: {
              id: Number(body.id),
            },
          },
        ],
      },

      orderBy: {
        watchProduct: 'desc',
      },
      take: Number(body.take) * Number(body.skip),
    })

    return sortByPopularity
  }

  async sortByPriceAsc(body: GetParamProduct) {
    const sortByPriceAsc = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: Number(body.id),
                  },
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  id: Number(body.id),
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
          },
          {
            category: {
              id: Number(body.id),
            },
          },
        ],
      },

      orderBy: {
        price: 'asc',
      },
      take: Number(body.take) * Number(body.skip),
    })

    return sortByPriceAsc
  }

  async sortByPriceDesc(body: GetParamProduct) {
    const sortByPriceDesc = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: Number(body.id),
                  },
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  id: Number(body.id),
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
          },
          {
            category: {
              id: Number(body.id),
            },
          },
        ],
      },

      orderBy: {
        price: 'desc',
      },
      take: Number(body.take) * Number(body.skip),
    })

    return sortByPriceDesc
  }

  async sortByRatingDesc(body: GetParamProduct) {
    const sortByRatingDesc = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: Number(body.id),
                  },
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  id: Number(body.id),
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
          },
          {
            category: {
              id: Number(body.id),
            },
          },
        ],
      },

      orderBy: {
        rating: 'desc',
      },
      take: Number(body.take) * Number(body.skip),
    })

    return sortByRatingDesc
  }

  async sortByRewivesDesc(body: GetParamProduct) {
    const sortByRewivesDesc = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: Number(body.id),
                  },
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  id: Number(body.id),
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
          },
          {
            category: {
              id: Number(body.id),
            },
          },
        ],
      },

      orderBy: {
        countReviews: 'desc',
      },

      take: Number(body.take) * Number(body.skip),
    })

    return sortByRewivesDesc
  }

  //_____________________________________________________________
  // Для вывода товаров определенной группы  в Каталоге товаров
  //_____________________________________________________________

  async mainCategoryProduct(body: GetParamProduct) {
    const getMainCategoryProduct = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
          },
          {
            category: {
              id: Number(body.id),
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: Number(body.id),
                  },
                },
              },
            },
          },
        ],
      },
      take: Number(body.take),
    })

    return getMainCategoryProduct
  }

  //_____________________________________________________________
  // Получение одного товара
  //_____________________________________________________________

  async oneProduct(body: GetParamProduct) {
    const oneProduct = this.prisma.product.findMany({
      where: {
        id: Number(body.id),
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
}
