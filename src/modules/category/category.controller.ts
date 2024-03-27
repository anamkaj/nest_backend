import { Controller, Get, Query, HttpCode } from '@nestjs/common'
import { CategoryService } from './category.service'
import { GetParamCategory } from './dto/category.dto'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Принимаем id категории с фронта и получаем все категории для страницы категории

  @Get('/all-category')
  @HttpCode(200)
  async allCategory(@Query() body: GetParamCategory) {
    return this.categoryService.allCategory(body)
  }

  @Get('/null-category')
  @HttpCode(200)
  async nullCategory() {
    return this.categoryService.nullCategory()
  }
}
