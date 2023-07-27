import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query } from '@nestjs/common'

import { SearchDto } from './dto/search.dto'
import { SearchService } from './search.service'

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/searchProduct')
  @HttpCode(200)
  async productSearch(@Query() body: SearchDto) {
    if (Number(body.input)) {
      return this.searchService.resultArticle(body)
    } else {
      return this.searchService.resultSearch(body)
    }
  }
  @Get('/searchCategory')
  @HttpCode(200)
  async categorySearch(@Query() body: SearchDto) {
    return this.searchService.resultCategory(body)
  }
}
