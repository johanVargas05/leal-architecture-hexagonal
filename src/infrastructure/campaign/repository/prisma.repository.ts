import { CampaignEntity } from "@domain/campaign/campaign.entity";
import { CampaignRepository } from "@domain/campaign/campaign.repository";
import { PrismaConnection } from "@infrastructure/shared/db/prisma.connection";

export class PrismaRepository implements CampaignRepository {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = PrismaConnection.getInstance();
  }
  async finAll({
    shopId,
    subsidiaryId,
    date,
    amount,
  }: {
    subsidiaryId?: string | undefined;
    shopId?: string | undefined;
    date: Date;
    amount?: number | undefined;
  }): Promise<[] | CampaignEntity[]> {
    return await this.prisma.campaigns.findMany({
      where: {
        AND: [
          {
            date_init: {
              gte: date,
            },
          },
          {
            date_finish: {
              lte: date,
            },
          },
          {
            OR: [
              {
                shop_id: shopId,
              },
              {
                subsidiary_id: subsidiaryId,
              },
            ],
          },
          {
            minimum_amount: {
              gte: amount,
            },
          },
        ],
      },
    });
  }

  async finById(campaignId: string): Promise<CampaignEntity | null> {
    return await this.prisma.campaigns.findUnique({
      where: { id: campaignId },
    });
  }

  async create({
    data,
    shopId,
    subsidiaryId,
  }: {
    data: CampaignEntity;
    subsidiaryId?: string | undefined;
    shopId?: string | undefined;
  }): Promise<CampaignEntity> {
    return await this.prisma.campaigns.create({
      data: {
        ...data,
        shop: { connect: { id: shopId } },
        subsidiary: {
          connect: {
            id: subsidiaryId,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: Partial<CampaignEntity>
  ): Promise<CampaignEntity> {
    return await this.prisma.campaigns.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<CampaignEntity> {
    return await this.prisma.campaigns.delete({ where: { id } });
  }
}
