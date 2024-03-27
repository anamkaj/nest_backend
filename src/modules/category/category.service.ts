import { Injectable } from '@nestjs/common'
import { GetParamCategory } from './dto/category.dto'
import { PrismaService } from 'src/db/prisma.service'
import { categoryFlatArray } from './helper/category.filter'

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Получение всех категорий и подкатегорий

  async allCategory(body: GetParamCategory) {
    const categoryAll = this.prisma.category.findMany({
      include: {
        childrenCategories: {
          include: {
            childrenCategories: {
              include: {
                childrenCategories: true,
              },
            },
          },
        },
      },
    })

    // Фильтрация из всех категорий одну

    const category = await categoryAll

    // addStore(category)

    // if (filterCat(body.id)) {
    //   return flatArrayCategory
    // }
    return categoryFlatArray(category, body.id)
  }

  async nullCategory() {
    return this.prisma.category.findMany({
      include: {
        childrenCategories: {
          include: {
            childrenCategories: {
              include: {
                childrenCategories: true,
              },
            },
          },
        },
      },
    })
  }
}
