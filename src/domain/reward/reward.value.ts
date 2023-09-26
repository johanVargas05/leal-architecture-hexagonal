import { v4 as uuid } from "uuid";

import { RewardEntity } from "./reward.entity";

export class RewardValue implements RewardEntity {
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
  constructor(data: {
    name: string;
    description?: string | null;
    shop_id: string;
    points?: number | null;
    coins?: number | null;
    thumbnail: string | null;
    due_date?: Date | null;
    stock?: number | null;
  }) {
    this.id = uuid();
    this.name = data.name;
    this.shop_id = data.shop_id;
    this.description = data.description || "";
    this.points = data.points || 0;
    this.coins = data.coins || 0;
    this.thumbnail = data.thumbnail;
    this.due_date = data?.due_date ? new Date(data.due_date) : null;
    this.stock = data.stock;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
