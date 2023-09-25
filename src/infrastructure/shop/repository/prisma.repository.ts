import { ShopEntity } from "@domain/shop/shop.entity";
import { ShopRepository } from "@domain/shop/shop.repository";
import { PrismaConnection } from "@infrastructure/shared/db/prisma.connection";

export class PrismaRepository implements ShopRepository {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = PrismaConnection.getInstance();
  }

  async findById(id: string): Promise<ShopEntity | null> {
    return await this.prisma.shops.findUnique({ where: { id } });
  }

  async finAll(): Promise<ShopEntity[] | []> {
    return await this.prisma.shops.findMany();
  }

  async create(data: ShopEntity): Promise<ShopEntity> {
    const result = await this.prisma.shops.create({ data });
    return result;
  }

  async update(
    id: string,
    data: { name?: string | undefined; conversion_points?: number | undefined }
  ): Promise<ShopEntity> {
    return await this.prisma.shops.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<ShopEntity> {
    return await this.prisma.shops.delete({ where: { id } });
  }
}
