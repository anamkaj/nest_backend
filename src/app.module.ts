import { Module } from '@nestjs/common'
import { SearchModule } from './modules/search/search.module'
import { FormModule } from './modules/form/form.module'
import { CategoryModule } from './modules/category/category.module'
import { ReviewsModule } from './modules/reviews/reviews.module'
import { ProductModule } from './modules/product/product.module'
import { CountsModule } from './modules/count/counts.module'
import { PostModule } from './modules/post/post.module'
import { FilterModule } from './modules/filter/filter.module'
import { AuthModule } from './modules/auth/auth.module'
import { PrismaService } from './db/prisma.service'
import { AuthService } from './modules/auth/auth.service'
import { UserModule } from './modules/user/user.module'
import { UserService } from './modules/user/user.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    FormModule,
    ReviewsModule,
    CountsModule,
    SearchModule,
    PostModule,
    FilterModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [AuthService, UserService, PrismaService, JwtService],
})
export class AppModule {}
