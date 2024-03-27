import { ProductService } from './product.service'
import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { GetParamProduct } from './dto/product.dto'

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/sitemap')
  @HttpCode(200)
  async allProductBySiteMap() {
    return this.productService.allProductBySiteMap()
  }

  @Get('/notFilter')
  @HttpCode(200)
  async getAllProductNotFilter(@Query() categoryId: { id: string }) {
    const { id } = categoryId
    return this.productService.getAllProductNotFilter(Number(id))
  }

  //_________________________________________
  // Тестовый роут
  @Get('/all/test')
  @HttpCode(200)
  async sortFilter(@Query() body: GetParamProduct) {
    return this.productService.sortFilter(body)
  }
  // Основной запрос на получения товаров каталога
  @Get('/all/sort')
  @HttpCode(200)
  async sortByParam(@Query() body: GetParamProduct) {
    console.log(body)
    return this.productService.sortByParam(body)
  }

  @Get('/one')
  @HttpCode(200)
  async oneProduct(@Query() body: GetParamProduct) {
    return this.productService.oneProduct(body)
  }

  @Get('/popularProduct')
  @HttpCode(200)
  async popularProduct() {
    return this.productService.popularProduct()
  }
}
