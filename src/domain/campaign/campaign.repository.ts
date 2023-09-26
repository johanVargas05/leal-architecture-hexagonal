import { CampaignEntity } from "./campaign.entity";

export interface CampaignRepository {
  finAll(filters: {
    subsidiaryId?: string;
    shopId?: string;
    date: Date;
    amount?: number;
  }): Promise<Array<CampaignEntity> | []>;
  finById(campaignId: string): Promise<CampaignEntity | null>;
  create(data: {
    data: CampaignEntity;
    subsidiaryId?: string;
    shopId?: string;
  }): Promise<CampaignEntity>;
  update(id: string, data: Partial<CampaignEntity>): Promise<CampaignEntity>;
  delete(id: string): Promise<CampaignEntity>;
}
