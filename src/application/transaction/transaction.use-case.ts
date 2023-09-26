import { CampaignUseCase } from "@application/campaign/campaign.use-case";
import { PointUseCase } from "@application/point/point.use-case";
import { UserUseCase } from "@application/user/user.use-case";
import { CampaignEntity } from "@domain/campaign/campaign.entity";
import { RewardRepository } from "@domain/reward/reward.repository";
import { ResponseEntity } from "@domain/shared/response.entity";
import { ShopRepository } from "@domain/shop/shop.repository";
import { SubsidiaryRepository } from "@domain/subsidiary/subsidiary.repository";
import {
  TYPE_CURRENCY,
  TYPE_TRANSACTION,
} from "@domain/transaction/transaction.entity";
import { TransactionRepository } from "@domain/transaction/transaction.repository";
import { TransactionValue } from "@domain/transaction/transaction.value";

export class TransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly campaignUseCase: CampaignUseCase,
    private readonly subsidiaryRepository: SubsidiaryRepository,
    private readonly shopRepository: ShopRepository,
    private readonly rewardRepository: RewardRepository,
    private readonly userUseCase: UserUseCase,
    private readonly pointUseCase: PointUseCase
  ) {}

  async purchaseInSubsidiary(data: {
    user_id: string;
    subsidiary_id: string;
    amount: number;
    description: string;
  }): Promise<ResponseEntity<{ coins: number; points: number }>> {
    try {
      const { ok, message, code, parameters } =
        await this.getParametersTransaction(data.subsidiary_id, data.amount);

      if (!ok || !parameters) return { ok, message, code: code || 400 };

      const { campaigns, conversion, shopId } = parameters;

      const { points, coins } = this.calculatePoints(
        campaigns,
        data.amount,
        conversion
      );

      const transactionPoints = new TransactionValue({
        valor: points,
        description: data.description,
        type_currency: TYPE_CURRENCY.points,
        type_transaction: TYPE_TRANSACTION.income,
        subsidiary_id: data.subsidiary_id,
        user_id: data.user_id,
        real_money: data.amount,
      });

      const transactionCoins = new TransactionValue({
        valor: coins,
        description: data.description,
        type_currency: TYPE_CURRENCY.coins,
        type_transaction: TYPE_TRANSACTION.income,
        subsidiary_id: data.subsidiary_id,
        user_id: data.user_id,
        real_money: data.amount,
      });

      await this.transactionRepository.create(transactionPoints);
      await this.transactionRepository.create(transactionCoins);

      await this.updateBalances({
        coins,
        points,
        shopId,
        userId: data.user_id,
      });

      return { ok: true, data: { points, coins }, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async redeemInSubsidiary({
    reward_id,
    user_id,
    subsidiary_id,
    type_redeem,
  }: {
    user_id: string;
    subsidiary_id: string;
    reward_id: string;
    type_redeem: "points" | "coins";
  }): Promise<
    ResponseEntity<{
      cost: number;
      new_balance: number;
      description: string;
      type_currency: TYPE_CURRENCY;
      shopId: string;
    }>
  > {
    try {
      const { data, ok, message, code } = await this.validationRedeem(
        reward_id,
        type_redeem,
        user_id
      );
      if (!data) return { ok, message, code };
      const transactionOutgoing = new TransactionValue({
        valor: data.cost,
        description: data.description,
        type_currency: data.type_currency,
        type_transaction: TYPE_TRANSACTION.outgoing,
        subsidiary_id: subsidiary_id,
        user_id: user_id,
        real_money: null,
      });
      await this.transactionRepository.create(transactionOutgoing);

      if (type_redeem === "coins") {
        await this.updateBalances({
          coins: data.new_balance,
          points: undefined,
          shopId: data.shopId,
          userId: user_id,
        });
      }

      await this.updateBalances({
        coins: undefined,
        points: data.new_balance,
        shopId: data.shopId,
        userId: user_id,
      });

      return { ok: true, data, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async findByShop(shopId: string) {
    const data = await this.transactionRepository.findByShop(shopId);
    if (data.length === 0) {
      return {
        ok: false,
        message: "the shop has no associated transactions",
        code: 404,
      };
    }
    return { ok: true, data, code: 200 };
  }

  async findBySubsidiary(subsidiaryId: string) {
    const data = await this.transactionRepository.findBySubsidiary(
      subsidiaryId
    );
    if (data.length === 0) {
      return {
        ok: false,
        message: "the subsidiary has no associated transactions",
        code: 404,
      };
    }
    return { ok: true, data, code: 200 };
  }

  async findByUser(userId: string) {
    const data = await this.transactionRepository.findByUser(userId);
    if (data.length === 0) {
      return {
        ok: false,
        message: "the user has no associated transactions",
        code: 404,
      };
    }
    return { ok: true, data, code: 200 };
  }

  private calculatePoints(
    campaigns: CampaignEntity[],
    amount: number,
    conversionShop: number
  ) {
    let points = Math.trunc(amount / conversionShop);
    let coins = points;

    if (campaigns.length > 0) {
      campaigns.forEach((campaign) => {
        points = points * campaign.reward;
      });
      coins = points;
    }
    return { points, coins };
  }

  private async updateBalances({
    coins,
    points,
    shopId,
    userId,
  }: {
    points?: number;
    coins?: number;
    userId: string;
    shopId: string;
  }) {
    if (points) {
      const resultPointsUpdated = await this.pointUseCase.upsert({
        userId,
        shopId,
        balance: points,
      });
      if (!resultPointsUpdated.code)
        throw new Error(resultPointsUpdated.message);
    }

    if (coins) {
      const resultCoinsUpdated = await this.userUseCase.updateBalance(
        userId,
        coins
      );
      if (!resultCoinsUpdated.code) throw new Error(resultCoinsUpdated.message);
    }
  }

  private async validationRedeem(
    reward_id: string,
    type_redeem: "points" | "coins",
    user_id: string
  ) {
    const reward = await this.rewardRepository.findById(reward_id);
    if (!reward)
      return {
        ok: false,
        message: "The reward was not found",
        code: 404,
      };
    if (type_redeem === "points") {
      const points = await this.pointUseCase.getPoints(user_id, reward.shop_id);
      if (!points.data || !reward?.points)
        return { ok: false, message: "Error with sent values", code: 400 };
      if (reward?.points > points.data)
        return {
          ok: false,
          message: "It does not have the necessary points",
          code: 400,
        };
      const newBalance = Math.trunc(points.data - reward.points);
      return {
        ok: true,
        data: {
          cost: reward.points,
          new_balance: newBalance,
          description: `${reward.points} points were redeemed in the reward ${reward.name}`,
          type_currency: TYPE_CURRENCY.points,
          shopId: reward.shop_id,
        },
      };
    }

    const user = await this.userUseCase.findById(user_id);
    if (!user.data || !reward.coins)
      return { ok: false, message: "Error with sent values", code: 400 };
    if (reward.coins > user.data.balance_coins)
      return {
        ok: false,
        message: "It does not have the necessary coins",
        code: 400,
      };
    const newBalance = Math.trunc(user.data.balance_coins - reward.coins);
    return {
      ok: true,
      data: {
        cost: reward.coins,
        new_balance: newBalance,
        description: `${reward.coins} coins were redeemed in the reward ${reward.name}`,
        type_currency: TYPE_CURRENCY.coins,
        shopId: reward.shop_id,
      },
    };
  }

  private async getParametersTransaction(subsidiaryId: string, amount: number) {
    const subsidiary = await this.subsidiaryRepository.findById(subsidiaryId);

    if (!subsidiary)
      return { ok: false, message: "Subsidiary not found", code: 404 };
    const shopId = subsidiary.shop_id || "";
    const shop = await this.shopRepository.findById(shopId);

    if (!shop) return { ok: false, message: "Subsidiary not found", code: 404 };

    if (typeof amount !== "number" || !shop?.conversion_points)
      return { ok: false, message: "Bad request", code: 400 };

    const campaigns = await this.campaignUseCase.campaignsApply(
      subsidiaryId,
      amount
    );
    return {
      ok: true,
      parameters: {
        campaigns,
        conversion: shop.conversion_points,
        shopId: shop.id,
      },
    };
  }
}
