import { CampaignEntity } from "./campaign.entity";

export interface CampaignRepository {
  findAll(filters: {
    subsidiaryId?: string;
    shopId?: string;
    date: Date;
    amount?: number;
  }): Promise<Array<CampaignEntity> | []>;
  findById(campaignId: string): Promise<CampaignEntity | null>;
  create(data: {
    data: CampaignEntity;
    subsidiaryId?: string;
    shopId?: string;
  }): Promise<CampaignEntity>;
  update(id: string, data: Partial<CampaignEntity>): Promise<CampaignEntity>;
  delete(id: string): Promise<CampaignEntity>;
}
