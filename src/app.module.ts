import { Module } from '@nestjs/common'
import { SearchModule } from './modules/search/search.module'
import { FormModule } from './modules/form/form.module'
import { CategoryModule } from './modules/category/category.module'
import { ReviewsModule } from './modules/reviews/reviews.module'
import { ProductModule } from './modules/product/product.module'
import { CountsModule } from './modules/count/counts.module'
import { PostModule } from './modules/post/post.module'

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    FormModule,
    ReviewsModule,
    CountsModule,
    SearchModule,
    PostModule,
  ],
  controllers: [],
})
export class AppModule {}
