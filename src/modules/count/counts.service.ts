import { Injectable } from '@nestjs/common'
import { timer } from 'rxjs'

import { PrismaService } from 'src/db/prisma.service'

@Injectable()
export class CountsService {
  constructor(private prisma: PrismaService) {}

  // Счетчик увеличения количества просмотров

  async countViewInc(id: number) {
    if (await result) {
      const updateCountView = this.prisma.product.update({
        where: {
          id: id,
        },
        data: {
          watchProduct: {
            increment: 1,
          },
        },
      })
      return updateCountView.then(() => {
        return true
      })
    }
  }
  async countRatingInc(id: number) {
    if (await result) {
      const countRatingInc = this.prisma.product.update({
        where: {
          id: id,
        },
        data: {
          countReviews: {
            increment: 1,
          },
        },
      })
      return countRatingInc.then(() => {
        return true
      })
    }
  }
}
// Таймер изменения счетчиков (через 50 сек изменит значение счетчиков в БД)
const Timer = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 120000)
  })
}

const result = Timer().then(res => res)
