import { Controller, Get, Post, Body, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'
import { FormService } from './form.service'
import { DtoDataForm } from './dto/create-form.dto'

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Post('/order')
  @HttpCode(200)
  async fastOrder(@Body() FormOrder: DtoDataForm) {
    return this.formService.fastOrder(FormOrder)
  }

  @Post('/order/oneProduct')
  @HttpCode(200)
  async oneProduct(@Body() FormOrder: DtoDataForm) {
    return this.formService.oneProduct(FormOrder)
  }

  @Post('/order/cart')
  @HttpCode(200)
  async orderFormCartPage(@Body() FormOrder: DtoDataForm) {
    console.log(FormOrder)
    return this.formService.orderFormCartPage(FormOrder)
  }
}

// @Post('/orderSpecialist')
// @HttpCode(200)
// specialistOrder(@Body() FormOrder: DtoDataForm) {
//
//   return this.formService.create(FormOrder)
// }
