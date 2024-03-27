import { Module } from '@nestjs/common'
import { CountsService } from './counts.service'
import { CountsController } from './counts.controller'
import { PrismaService } from 'src/db/prisma.service'

@Module({
  controllers: [CountsController],
  providers: [CountsService, PrismaService],
})
export class CountsModule {}
