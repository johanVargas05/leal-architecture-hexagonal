import { v4 as uuid } from "uuid";

import { CampaignEntity } from "./campaign.entity";

export class CampaignValue implements CampaignEntity {
  id: string;
  name: string;
  description: string;
  date_init: Date;
  date_finish: Date;
  reward: number;
  minimum_amount: number;
  is_cumulative: boolean;
  created_at: Date;
  updated_at: Date;
  constructor({
    name,
    description,
    date_finish,
    date_init,
    is_cumulative,
    reward,
    minimum_amount,
  }: Omit<CampaignEntity, "id" | "created_at" | "updated_at">) {
    this.id = uuid();
    this.name = name;
    this.description = description || "";
    this.reward = reward;
    this.minimum_amount = minimum_amount || 0;
    this.is_cumulative = is_cumulative || false;
    this.date_init = new Date(date_init);
    this.date_finish = new Date(date_finish);
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
