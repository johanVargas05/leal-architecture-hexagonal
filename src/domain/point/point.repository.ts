import { PointEntity } from "./point.entity";

export interface PointRepository {
  findPointsByUser(userId: string, shopId: string): Promise<PointEntity | null>;
  upsert(data: PointEntity): Promise<PointEntity>;
}
