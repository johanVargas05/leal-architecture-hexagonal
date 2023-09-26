import { RewardEntity } from "./reward.entity";

export interface RewardRepository {
  findByShop(shopId: string): Promise<Array<RewardEntity> | []>;
  findById(id: string): Promise<RewardEntity | null>;
  create(data: RewardEntity): Promise<RewardEntity>;
  update(id: string, data: Partial<RewardEntity>): Promise<RewardEntity>;
  delete(id: string): Promise<RewardEntity>;
}
