export interface CampaignEntity {
  id: string;
  name: string;
  description?: string | null;
  date_init: Date;
  date_finish: Date;
  reward: number;
  minimum_amount: number | null;
  is_cumulative: boolean;
  created_at: Date;
  updated_at: Date;
}
