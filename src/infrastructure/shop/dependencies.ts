import { ShopUseCase } from "@application/shop/shop.use-case";

import { PrismaRepository } from "./repository/prisma.repository";
import { ShopController } from "./shop.controller";

const prismaRepository = new PrismaRepository();
const shopUseCase = new ShopUseCase(prismaRepository);
export const shopController = new ShopController(shopUseCase);
