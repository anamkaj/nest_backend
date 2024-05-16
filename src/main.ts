import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { config } from 'dotenv'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())
  config()
  app.enableCors()

  await app.listen(4000)
}
bootstrap()
