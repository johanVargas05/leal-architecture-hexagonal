import { PointEntity } from "@domain/point/point.entity";
import { PointRepository } from "@domain/point/point.repository";
import { PrismaConnection } from "@infrastructure/shared/db/prisma.connection";

export class PrismaRepository implements PointRepository {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = PrismaConnection.getInstance();
  }
  async findPointsByUser(
    userId: string,
    shopId: string
  ): Promise<PointEntity | null> {
    const [result] = await this.prisma.points.findMany({
      where: {
        AND: [{ shop_id: shopId }, { user_id: userId }],
      },
    });
    return result || null;
  }
  async upsert(data: PointEntity): Promise<PointEntity> {
    const result = await this.findPointsByUser(data.user_id, data.shop_id);
    return await this.prisma.points.upsert({
      where: {
        id: result?.id,
      },
      create: data,
      update: {
        balance_points: data.balance_points,
        updated_at: data.updated_at,
      },
    });
  }
}
