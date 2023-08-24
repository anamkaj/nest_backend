import { PrismaService } from "src/db/prisma.service";
import { GetParamProduct, ProductDto } from "./dto/product.dto";

import { Injectable } from "@nestjs/common";

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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },

          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              id: Number(body.id),
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
        ],
      },

      skip: Number(body.skip),
      take: Number(body.take),
    });

    return getAllProduct;
  }

  async getAllProductNotFilter(id: number) {
    const getAllProductNotFilter = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: id,
                  },
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  id: id,
                },
              },
            },
          },

          {
            category: {
              parentCategory: {
                id: id,
              },
            },
          },
          {
            category: {
              id: id,
            },
          },
        ],
      },
    });
    const product = await getAllProductNotFilter;
    const length: number = product.length;
    const maxPrice: number = Math.max.apply(
      Math,
      product.map((x) => x.price)
    );
    const minPrice: number = Math.min.apply(
      Math,
      product.map((x) => x.price)
    );
    return JSON.stringify({ length, maxPrice, minPrice });
  }

  //_________________________________________
  // Роут фильтрацию из Хедера
  //_________________________________________

  async sortByPopularity(body: GetParamProduct) {
    console.log(body);
    const brand = body.brand.split(",");
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
            brand:
              body.brand.length !== 0
                ? { in: brand, mode: "insensitive" }
                : {
                    contains: "",
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
            brand:
              body.brand.length !== 0
                ? { in: brand, mode: "insensitive" }
                : {
                    contains: "",
                  },
          },

          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
            brand:
              body.brand.length !== 0
                ? { in: brand, mode: "insensitive" }
                : {
                    contains: "",
                  },
          },
          {
            category: {
              id: Number(body.id),
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
            brand:
              body.brand.length !== 0
                ? { in: brand, mode: "insensitive" }
                : {
                    contains: "",
                  },
          },
        ],
      },

      orderBy: {
        watchProduct: "desc",
      },
      skip: Number(body.skip),
      take: Number(body.take),
    });

    return sortByPopularity;
  }

  async sortByPriceAsc(body: GetParamProduct) {
    console.log(body);
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              id: Number(body.id),
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
        ],
      },

      orderBy: {
        price: "asc",
      },
      skip: Number(body.skip),
      take: Number(body.take),
    });

    return sortByPriceAsc;
  }

  async sortByPriceDesc(body: GetParamProduct) {
    console.log(body);
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              id: Number(body.id),
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
        ],
      },

      orderBy: {
        price: "desc",
      },
      skip: Number(body.skip),
      take: Number(body.take),
    });

    return sortByPriceDesc;
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              id: Number(body.id),
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
        ],
      },

      orderBy: {
        rating: "desc",
      },
      skip: Number(body.skip),
      take: Number(body.take),
    });

    return sortByRatingDesc;
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
          {
            category: {
              id: Number(body.id),
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
          },
        ],
      },

      orderBy: {
        countReviews: "desc",
      },

      skip: Number(body.skip),
      take: Number(body.take),
    });

    return sortByRewivesDesc;
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
    });

    return getMainCategoryProduct;
  }

  //_____________________________________________________________
  // Получение одного товара
  //_____________________________________________________________

  async oneProduct(body: GetParamProduct) {
    const oneProduct = this.prisma.product.findMany({
      where: {
        id: Number(body.id),
      },
    });

    return oneProduct;
  }

  async popularProduct() {
    const popularProduct = this.prisma.product.findMany({
      orderBy: {
        watchProduct: "desc",
      },
      take: 12,
    });

    return popularProduct;
  }

  async brandFilter(id: number) {
    const brandFilter = this.prisma.product.findMany({
      where: {
        OR: [
          {
            category: {
              parentCategory: {
                parentCategory: {
                  parentCategory: {
                    id: Number(id),
                  },
                },
              },
            },
          },
          {
            category: {
              parentCategory: {
                parentCategory: {
                  id: Number(id),
                },
              },
            },
          },

          {
            category: {
              parentCategory: {
                id: Number(id),
              },
            },
          },
          {
            category: {
              id: Number(id),
            },
          },
        ],
      },
    });

    const brandArray = (await brandFilter).map((x) => x.brand);

    return JSON.stringify(brandArray);
  }

  async countFilterProduct(body: GetParamProduct) {
    console.log(body);
    const brand = body.brand.split(",");
    const countFilterProduct = this.prisma.product.findMany({
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
            brand:
              body.brand.length !== 0
                ? { in: brand, mode: "insensitive" }
                : {
                    contains: "",
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
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
            brand:
              body.brand.length !== 0
                ? { in: brand, mode: "insensitive" }
                : {
                    contains: "",
                  },
          },

          {
            category: {
              parentCategory: {
                id: Number(body.id),
              },
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
            brand:
              body.brand.length !== 0
                ? { in: brand, mode: "insensitive" }
                : {
                    contains: "",
                  },
          },
          {
            category: {
              id: Number(body.id),
            },
            price: {
              lte: Number(body.priceMax),
              gte: Number(body.priceMin),
            },
            brand:
              body.brand.length !== 0
                ? { in: brand, mode: "insensitive" }
                : {
                    contains: "",
                  },
          },
        ],
      },
    });

    return (await countFilterProduct).length;
  }
}
