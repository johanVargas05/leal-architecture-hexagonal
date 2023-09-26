import { CampaignEntity } from "@domain/campaign/campaign.entity";
import { CampaignRepository } from "@domain/campaign/campaign.repository";
import { CampaignValue } from "@domain/campaign/campaign.value";
import { ResponseEntity } from "@domain/shared/response.entity";
import { SubsidiaryRepository } from "@domain/subsidiary/subsidiary.repository";

export class CampaignUseCase {
  constructor(
    private readonly campaignRepository: CampaignRepository,
    private subsidiaryRepository: SubsidiaryRepository
  ) {}
  async createCampaignShop(
    data: Omit<CampaignEntity, "id" | "created_at" | "updated_at">,
    shopId: string
  ): Promise<ResponseEntity<CampaignEntity>> {
    try {
      const campaignValue = new CampaignValue(data);
      const campaignCreated = await this.campaignRepository.create({
        data: campaignValue,
        shopId,
      });
      return { ok: true, data: campaignCreated, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async createCampaignSubsidiary(
    data: Omit<CampaignEntity, "id" | "created_at" | "updated_at">,
    subsidiaryId: string
  ): Promise<ResponseEntity<CampaignEntity>> {
    try {
      const campaignValue = new CampaignValue(data);
      const campaignCreated = await this.campaignRepository.create({
        data: campaignValue,
        subsidiaryId,
      });
      return { ok: true, data: campaignCreated, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async findById(campaignId: string): Promise<ResponseEntity<CampaignEntity>> {
    try {
      const campaign = await this.campaignRepository.findById(campaignId);
      if (!campaign)
        return {
          ok: false,
          message: `Campaign with id ${campaignId} not found`,
          code: 404,
        };
      return { ok: true, data: campaign, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async findCampaignsByShop(shopId: string) {
    return await this.findCampaigns({ shopId });
  }

  async findCampaignsBySubsidiary(subsidiaryId: string) {
    return await this.findCampaigns({ subsidiaryId });
  }

  async campaignsApply(
    subsidiaryId: string,
    amount: number
  ): Promise<Array<CampaignEntity>> {
    const subsidiary = await this.subsidiaryRepository.findById(subsidiaryId);
    const { data } = await this.findCampaigns({
      subsidiaryId,
      shopId: subsidiary?.shop_id,
      amount,
    });
    if (!data) return [];
    if (data.length > 1) {
      const campaignsFilter = data.filter((campaign) => campaign.is_cumulative);
      return campaignsFilter;
    } else {
      return data;
    }
  }

  async updateCampaign(
    shopId: string,
    data: Partial<CampaignEntity>
  ): Promise<ResponseEntity<CampaignEntity>> {
    try {
      const updated_at = new Date();
      const shopUpdated = await this.campaignRepository.update(shopId, {
        ...data,
        updated_at,
      });
      return { ok: true, data: shopUpdated, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async delete(campaignId: string): Promise<ResponseEntity<CampaignEntity>> {
    try {
      const { error, code, ok, message } = await this.findById(campaignId);
      if (error) return { ok, error, code, message };

      const campaign = await this.campaignRepository.delete(campaignId);

      return { ok: true, data: campaign, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  private async findCampaigns(filters: {
    subsidiaryId?: string;
    shopId?: string;
    amount?: number;
  }): Promise<ResponseEntity<CampaignEntity[]>> {
    const date = new Date();
    const data = await this.campaignRepository.findAll({ ...filters, date });
    return { ok: true, data, code: 200 };
  }
}
