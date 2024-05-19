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

  app.enableCors({
    origin: ['https://tmk-v.ru', 'http://localhost:3000'],
    methods: 'GET,POST,OPTIONS,HEAD',
    allowedHeaders:
      'Authorization, Origin, X-Requested-With, Content-Type, Accept',
  })

  await app.listen(4000)
}
bootstrap()
