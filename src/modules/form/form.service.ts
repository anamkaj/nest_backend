import { Injectable } from '@nestjs/common'
import { DtoDataForm } from './dto/create-form.dto'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class FormService {
  constructor(private readonly mailerService: MailerService) {}
  async fastOrder(FormOrder: DtoDataForm) {
    if (!FormOrder) return 'В форме ошибка'
    return this.sendFormFeedback(FormOrder)
  }

  async orderFormCartPage(FormOrder: DtoDataForm) {
    if (!FormOrder) return 'В форме ошибка'
    return this.sendCartPage(FormOrder)
  }

  async oneProduct(FormOrder: DtoDataForm) {
    if (!FormOrder) return 'В форме ошибка'
    console.log(FormOrder)
    return this.sendFormOneProduct(FormOrder)
  }

  public sendCartPage(FormOrder: DtoDataForm): void {
    const { data } = FormOrder
    const cart = data.data.map(x => [
      `${x.title}`,
      `Количество: ${x.count} шт. `,
      `Размер скидки: ${x.sale}%. `,
      `Стоимость за одну штуку: ${x.price} (без скидка)`,
      `<br>`,
    ])

    this.mailerService
      .sendMail({
        to: 'tmk-v.ru@yandex.ru', // list of receivers
        from: 'order@tmk-v.ru', // sender address
        subject: 'Корзина Покупки ✔', // Subject line
        text: 'welcome', // plaintext body
        html: `<div> 
        <h1 style="color: black; font-size: 14px"> Имя: ${data.name}</h1>
        <h2 style="color: black; font-size: 14px">Телефон: ${data.phone}</h2>
        <h2 style="color: black; font-size: 14px">Почта: ${data.email}</h2>
        <h2 style="color: black; font-size: 14px; font-family: monospace; font-weight: lighter;">Корзина: ${'<br>'} ${cart}</h2>
        </div>`, // HTML body content
      })
      .then(success => {
        console.log(success)
        return 'Форма отправленна'
      })
      .catch(err => {
        console.log(err)
      })
  }

  public sendFormFeedback(FormOrder: DtoDataForm): void {
    const { data } = FormOrder

    this.mailerService
      .sendMail({
        to: 'tmk-v.ru@yandex.ru', // list of receivers
        from: 'order@tmk-v.ru', // sender address
        subject: 'Запрос консультации✔', // Subject line
        text: 'welcome', // plaintext body
        html: `<div> 
        <h1 style="color: black; font-size: 14px"> Имя: ${data.name}</h1>
        <h2 style="color: black; font-size: 14px">Телефон: ${data.phone}</h2>
        <h2 style="color: black; font-size: 14px">Почта: ${data.email}</h2>
        
        </div>`, // HTML body content
      })
      .then(success => {
        console.log(success)
        return 'Форма отправленна'
      })
      .catch(err => {
        console.log(err)
      })
  }

  public sendFormOneProduct(FormOrder: DtoDataForm): void {
    const { data } = FormOrder

    this.mailerService
      .sendMail({
        to: 'tmk-v.ru@yandex.ru', // list of receivers
        from: 'order@tmk-v.ru',
        subject: 'Заказ одного товара ✔', // Subject line
        text: 'welcome', // plaintext body
        html: `<div> 
        <h1 style="color: black; font-size: 14px"> Имя: ${data.name}</h1>
        <h2 style="color: black; font-size: 14px">Телефон: ${data.phone}</h2>
        <h2 style="color: black; font-size: 14px">Почта: ${data.email}</h2>
        <h2 style="color: black; font-size: 14px">Артикул: ${data.article}</h2>
        <h2 style="color: black; font-size: 14px">Название товара: ${data.title}</h2>
        <h2 style="color: black; font-size: 14px">Стоимость: ${data.price}</h2>
        
        </div>`, // HTML body content
      })
      .then(success => {
        console.log(success)
        return 'Форма отправленна'
      })
      .catch(err => {
        console.log(err)
      })
  }
}
