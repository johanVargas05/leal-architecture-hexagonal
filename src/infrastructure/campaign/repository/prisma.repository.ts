import { CampaignEntity } from "@domain/campaign/campaign.entity";
import { CampaignRepository } from "@domain/campaign/campaign.repository";
import { PrismaConnection } from "@infrastructure/shared/db/prisma.connection";

export class PrismaRepository implements CampaignRepository {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = PrismaConnection.getInstance();
  }
  async findAll({
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
              lte: date,
            },
          },
          {
            date_finish: {
              gte: date,
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
            minimum_amount: amount
              ? {
                  lte: amount,
                }
              : undefined,
          },
        ],
      },
    });
  }

  async findById(campaignId: string): Promise<CampaignEntity | null> {
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
        shop: { connect: shopId ? { id: shopId } : undefined },
        subsidiary: {
          connect: subsidiaryId
            ? {
                id: subsidiaryId,
              }
            : undefined,
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
