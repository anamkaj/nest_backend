import { Injectable, Post } from '@nestjs/common'
import { CreatePostDto } from './dto/post.dto'
import { PrismaService } from 'src/db/prisma.service'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  getAllPost() {
    const getAllPost = this.prisma.post.findMany({})
    return getAllPost
  }

  getOnePost(id: number) {
    const getOnePost = this.prisma.post.findMany({
      where: {
        id: id,
      },
    })
    return getOnePost
  }
}
