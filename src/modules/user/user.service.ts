import { ConflictException, Injectable } from '@nestjs/common'
import { UserDto } from './dto/dto'
import { hash } from 'bcrypt'
import { PrismaService } from 'src/db/prisma.service'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    })

    if (user)
      throw new ConflictException('Пользователь с таким Email уже существует')

    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    })

    const { password, ...result } = newUser
    return result
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    })
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    })

    const { password, ...res } = user
    return res
  }
}
