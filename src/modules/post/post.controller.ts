import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common'
import { PostService } from './post.service'

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/post')
  @HttpCode(200)
  getAllPost() {
    return this.postService.getAllPost()
  }

  @Get('/post/:id')
  @HttpCode(200)
  getOnePost(@Param('id') id: string) {
    
    return this.postService.getOnePost(+id)
  }
}
