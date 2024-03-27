import { Controller, Get, HttpCode, Query } from '@nestjs/common'

import { SearchDto } from './dto/search.dto'
import { SearchService } from './search.service'

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/searchData')
  @HttpCode(200)
  async searchData(@Query() body: SearchDto) {
    try {
      const result = await this.searchService.resultData(body)
      return result
    } catch (error) {
      return { error: 'Error Search Product' }
    }
  }
}
