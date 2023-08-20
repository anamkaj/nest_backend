import { ProductService } from "./product.service";
import { Controller, Get, HttpCode, Query } from "@nestjs/common";
import { GetParamProduct, ProductDto } from "./dto/product.dto";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //_________________________________________
  // Роут на получение всех продуктов (товаров)
  //_________________________________________
  @Get("/all")
  @HttpCode(200)
  async getAllProduct(@Query() body: GetParamProduct) {
    console.log(body);
    return this.productService.getAllProduct(body);
  }
  @Get("/notFilter")
  @HttpCode(200)
  async getAllProductNotFilter(@Query() categoryId: { id: string }) {
    const { id } = categoryId;
    return this.productService.getAllProductNotFilter(Number(id));
  }

  //_________________________________________
  // Роут фильтрацию из Хедера
  //_________________________________________

  // @Get('/all/mainCategoryProduct')
  // @HttpCode(200)
  // async mainCategoryProduct(@Query() body: GetParamProduct) {
  //   console.log(body)
  //   return this.productService.mainCategoryProduct(body)
  // }

  @Get("/all/popularity_desc")
  @HttpCode(200)
  async sortByPopularity(@Query() body: GetParamProduct) {
    return this.productService.sortByPopularity(body);
  }

  @Get("/all/price_asc")
  @HttpCode(200)
  async sortByPriceAsc(@Query() body: GetParamProduct) {
    return this.productService.sortByPriceAsc(body);
  }
  @Get("/all/price_desc")
  @HttpCode(200)
  async sortByPriceDesc(@Query() body: GetParamProduct) {
    return this.productService.sortByPriceDesc(body);
  }

  @Get("/all/rating_desc")
  @HttpCode(200)
  async sortByRatingDesc(@Query() body: GetParamProduct) {
    return this.productService.sortByRatingDesc(body);
  }

  @Get("/all/rewives_desc")
  @HttpCode(200)
  async sortByRewivesDesc(@Query() body: GetParamProduct) {
    return this.productService.sortByRewivesDesc(body);
  }

  @Get("/one")
  @HttpCode(200)
  async oneProduct(@Query() body: GetParamProduct) {
    console.log(body);
    return this.productService.oneProduct(body);
  }

  @Get("/popularProduct")
  @HttpCode(200)
  async popularProduct() {
    console.log("request");
    return this.productService.popularProduct();
  }

  @Get("/brandFilter")
  @HttpCode(200)
  async brandFilter(@Query() categoryId: { id: string }) {
    const { id } = categoryId;
    console.log(id);
    return this.productService.brandFilter(Number(id));
  }
}
