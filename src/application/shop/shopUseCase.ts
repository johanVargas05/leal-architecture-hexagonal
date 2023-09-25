import { ResponseEntity } from "@domain/shared/response.entity";
import { ShopEntity } from "@domain/shop/shop.entity";
import { ShopRepository } from "@domain/shop/shop.repository";
import { ShopValue } from "@domain/shop/shop.value";

export class ShopUseCase {
  constructor(private readonly shopRepository: ShopRepository) {}
  async createShop(data: {
    name: string;
    conversion_points: number;
  }): Promise<ResponseEntity<ShopEntity>> {
    try {
      const shopValue = new ShopValue(data);
      const shopCreated = await this.shopRepository.create(shopValue);
      return { ok: true, data: shopCreated, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async findAllShops(): Promise<ResponseEntity<ShopEntity[]>> {
    const data = await this.shopRepository.finAll();
    return { ok: true, data, code: 200 };
  }

  async findById(shopId: string): Promise<ResponseEntity<ShopEntity>> {
    try {
      const shop = await this.shopRepository.findById(shopId);
      if (!shop)
        return {
          ok: false,
          message: `Shop with id ${shopId} not found`,
          code: 404,
        };
      return { ok: true, data: shop, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async updateShop(
    shopId: string,
    data: { name?: string; conversion_points?: number }
  ): Promise<ResponseEntity<ShopEntity>> {
    try {
      const shopUpdated = await this.shopRepository.update(shopId, data);
      return { ok: true, data: shopUpdated, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async delete(shopId: string): Promise<ResponseEntity<ShopEntity>> {
    try {
      const { error, code, ok, message } = await this.findById(shopId);
      if (error) return { ok, error, code, message };

      const shop = await this.shopRepository.delete(shopId);

      return { ok: true, data: shop, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }
}
