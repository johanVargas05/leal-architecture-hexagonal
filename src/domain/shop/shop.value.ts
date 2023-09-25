import { v4 as uuid } from "uuid";

import { ShopEntity } from "./shop.entity";

export class ShopValue implements ShopEntity {
  id: string;
  name: string;
  conversion_points: number;
  created_at: Date;
  updated_at: Date;
  constructor({
    name,
    conversion_points,
  }: {
    name: string;
    conversion_points: number;
  }) {
    this.id = uuid();
    this.name = name;
    this.conversion_points = conversion_points;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
