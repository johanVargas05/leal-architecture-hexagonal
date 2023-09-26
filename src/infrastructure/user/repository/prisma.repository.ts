import { UserEntity } from "@domain/user/user.entity";
import { UserRepository } from "@domain/user/user.repository";
import { PrismaConnection } from "@infrastructure/shared/db/prisma.connection";

export class PrismaRepository implements UserRepository {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = PrismaConnection.getInstance();
  }
  async findById(id: string): Promise<UserEntity | null> {
    return await this.prisma.users.findUnique({ where: { id: id } });
  }
  async findAll(): Promise<UserEntity[] | []> {
    return await this.prisma.users.findMany();
  }
  async create(data: UserEntity): Promise<UserEntity> {
    return await this.prisma.users.create({ data });
  }
  async update(
    id: string,
    data: {
      name?: string | undefined;
      email?: string | undefined;
      balance_coins?: number | undefined;
      updated_at: Date;
    }
  ): Promise<UserEntity> {
    return await this.prisma.users.update({ where: { id }, data });
  }
  async delete(id: string): Promise<UserEntity> {
    return await this.prisma.users.delete({ where: { id } });
  }
}
