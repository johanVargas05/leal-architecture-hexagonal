export interface RewardEntity {
  id: string;
  name: string;
  description?: string | null;
  shop_id: string;
  points?: number | null;
  coins?: number | null;
  thumbnail: string | null;
  due_date?: Date | null;
  stock?: number | null;
  created_at: Date;
  updated_at: Date;
}
