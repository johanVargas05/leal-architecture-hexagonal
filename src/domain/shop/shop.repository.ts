import { ShopEntity } from "./shop.entity";

export interface ShopRepository {
  findById(id: string): Promise<ShopEntity | null>;
  findAll(): Promise<Array<ShopEntity> | []>;
  create(data: ShopEntity): Promise<ShopEntity>;
  update(
    id: string,
    data: {
      name?: string;
      conversion_points?: number;
      updated_at: Date;
    }
  ): Promise<ShopEntity>;
  delete(id: string): Promise<ShopEntity>;
}
