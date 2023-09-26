import { SubsidiaryEntity } from "@domain/subsidiary/subsidiary.entity";
import { SubsidiaryRepository } from "@domain/subsidiary/subsidiary.repository";
import { PrismaConnection } from "@infrastructure/shared/db/prisma.connection";

export class PrismaRepository implements SubsidiaryRepository {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = PrismaConnection.getInstance();
  }

  async findById(id: string): Promise<SubsidiaryEntity | null> {
    return await this.prisma.subsidiaries.findUnique({ where: { id } });
  }

  async finAll(shopId: string): Promise<SubsidiaryEntity[] | []> {
    return await this.prisma.subsidiaries.findMany({
      where: { shop_id: shopId },
    });
  }

  async create(
    shopId: string,
    data: SubsidiaryEntity
  ): Promise<SubsidiaryEntity> {
    const result = await this.prisma.subsidiaries.create({
      data: {
        id: data.id,
        name: data.name,
        created_at: data.created_at,
        updated_at: data.updated_at,
        shop: {
          connect: {
            id: shopId,
          },
        },
      },
    });
    return result;
  }

  async update(
    id: string,
    data: {
      name?: string | undefined;
      updated_at: Date;
    }
  ): Promise<SubsidiaryEntity> {
    return await this.prisma.subsidiaries.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<SubsidiaryEntity> {
    return await this.prisma.subsidiaries.delete({ where: { id } });
  }
}
