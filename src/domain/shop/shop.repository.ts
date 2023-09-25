import { ShopEntity } from "./shop.entity";

export interface ShopRepository {
  findById(id: string): Promise<ShopEntity | null>;
  finAll(): Promise<Array<ShopEntity> | []>;
  create(data: ShopEntity): Promise<ShopEntity>;
  update(
    id: string,
    data: {
      name?: string;
      conversion_points?: number;
    }
  ): Promise<ShopEntity>;
  delete(id: string): Promise<ShopEntity>;
}
