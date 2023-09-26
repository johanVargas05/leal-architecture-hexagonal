import { v4 as uuid } from "uuid";

import { PointEntity } from "./point.entity";

export class PointValue implements PointEntity {
  id: string;
  user_id: string;
  shop_id: string;
  balance_points: number;
  created_at: Date;
  updated_at: Date;
  constructor({
    userId,
    shopId,
    balance,
  }: {
    userId: string;
    shopId: string;
    balance: number;
  }) {
    this.id = uuid();
    this.user_id = userId;
    this.shop_id = shopId;
    this.balance_points = balance || 0;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
