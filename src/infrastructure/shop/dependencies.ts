import { ShopUseCase } from "@application/shop/shop.use-case";

import { PrismaRepository } from "./repository/prisma.repository";
import { ShopController } from "./shop.controller";

export const dbRepository = new PrismaRepository();
const shopUseCase = new ShopUseCase(dbRepository);
export const shopController = new ShopController(shopUseCase);
