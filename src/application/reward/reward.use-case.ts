import { RewardEntity } from "@domain/reward/reward.entity";
import { RewardRepository } from "@domain/reward/reward.repository";
import { RewardValue } from "@domain/reward/reward.value";
import { ResponseEntity } from "@domain/shared/response.entity";

export class RewardUseCase {
  constructor(private rewardRepository: RewardRepository) {}

  async create(
    data: Omit<RewardEntity, "created_at" | "updated_at" | "id">
  ): Promise<ResponseEntity<RewardValue>> {
    try {
      const reward = new RewardValue(data);
      const result = await this.rewardRepository.create(reward);
      return { ok: true, data: result, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async findAllByShop(shopId: string): Promise<ResponseEntity<RewardEntity[]>> {
    const data = await this.rewardRepository.findByShop(shopId);
    if (data.length === 0) {
      return {
        ok: false,
        message: `No reward found associated with this store`,
        code: 404,
      };
    }
    return { ok: true, data, code: 200 };
  }

  async findById(rewardId: string): Promise<ResponseEntity<RewardEntity>> {
    try {
      const reward = await this.rewardRepository.findById(rewardId);
      if (!reward)
        return {
          ok: false,
          message: `Reward with id ${rewardId} not found`,
          code: 404,
        };
      return { ok: true, data: reward, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async update(
    rewardId: string,
    data: Partial<RewardEntity>
  ): Promise<ResponseEntity<RewardEntity>> {
    try {
      const updated_at = new Date();
      const rewardUpdated = await this.rewardRepository.update(rewardId, {
        ...data,
        updated_at,
      });
      return { ok: true, data: rewardUpdated, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async delete(rewardId: string): Promise<ResponseEntity<RewardEntity>> {
    try {
      const { error, code, ok, message } = await this.findById(rewardId);
      if (error) return { ok, error, code, message };

      const reward = await this.rewardRepository.delete(rewardId);

      return { ok: true, data: reward, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }
}
