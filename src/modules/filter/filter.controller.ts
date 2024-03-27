import { Controller, Get, HttpCode, Query } from '@nestjs/common'
import { FilterService } from './filter.service'
import { GetParamFilter } from './dto/filter.dto'

@Controller()
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('/filterParamsProduct')
  @HttpCode(200)
  async filterParamsProduct(@Query() body: GetParamFilter) {
    return this.filterService.filterParamsProduct(body)
  }
}
