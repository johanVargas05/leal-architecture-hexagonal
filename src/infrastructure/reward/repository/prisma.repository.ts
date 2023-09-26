import { RewardEntity } from "@domain/reward/reward.entity";
import { RewardRepository } from "@domain/reward/reward.repository";
import { PrismaConnection } from "@infrastructure/shared/db/prisma.connection";

export class PrismaRepository implements RewardRepository {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = PrismaConnection.getInstance();
  }
  async findByShop(shopId: string): Promise<RewardEntity[] | []> {
    return await this.prisma.rewards.findMany({ where: { shop_id: shopId } });
  }
  async findById(id: string): Promise<RewardEntity | null> {
    return await this.prisma.rewards.findUnique({ where: { id: id } });
  }
  async create(data: RewardEntity): Promise<RewardEntity> {
    return await this.prisma.rewards.create({ data });
  }
  async update(id: string, data: Partial<RewardEntity>): Promise<RewardEntity> {
    return await this.prisma.rewards.update({ where: { id: id }, data });
  }
  async delete(id: string): Promise<RewardEntity> {
    return await this.prisma.rewards.delete({ where: { id } });
  }
}
