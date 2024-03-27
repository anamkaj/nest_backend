import { Injectable } from '@nestjs/common'
import { DtoDataLike, DtoDataReviews, GetReviewDto, LikeDto } from './dto/create-review.dto'
import { PrismaService } from 'src/db/prisma.service'

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  // Запрос всех отзывов

  async findAll(body: GetReviewDto) {
    const findAll = this.prisma.reviews.findMany({
      where: {
        productId: Number(body.id),
      },
    })
    return findAll
  }

  // Добавление отзыва в DB

  async createReviews(body: DtoDataReviews) {
    const { data } = body
    const createReviews = this.prisma.reviews.create({
      data: {
        text: data.text,
        productId: data.productId,
      },
    })
    return createReviews.then(() => {
      return true
    })
  }
  // Добавление  лайков
  async incrementsLike(body: DtoDataLike) {
    const { data } = body
    const likeIncrements = this.prisma.reviews.update({
      where: {
        id: data.commentId,
      },
      data: {
        like: {
          increment: 1,
        },
      },
    })
    return likeIncrements.then(() => {
      return true
    })
  }
  // Добавление  дизлайков
  async decrementsLike(body: DtoDataLike) {
    const { data } = body
    const decrementsLike = this.prisma.reviews.update({
      where: {
        id: data.commentId,
      },
      data: {
        dislike: {
          increment: 1,
        },
      },
    })
    return decrementsLike.then(() => {
      return true
    })
  }

  async getAllReviews() {
    const getAllReviews = this.prisma.reviews.findMany({
      orderBy: {
        like: 'desc',
      },
      take: 20,
    })
    return getAllReviews
  }
}
