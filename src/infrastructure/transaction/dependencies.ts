import { TransactionUseCase } from "@application/transaction/transaction.use-case";
import { campaignUseCase } from "@infrastructure/campaign/dependencies";
import { pointUseCase } from "@infrastructure/point/dependencies";
import { dbRepository as rewardRepository } from "@infrastructure/reward/dependencies";
import { dbRepository as shopRepository } from "@infrastructure/shop/dependencies";
import { dbRepository as subsidiaryRepository } from "@infrastructure/subsidiary/dependencies";
import { userUseCase } from "@infrastructure/user/dependencies";

import { PrismaRepository } from "./repository/prisma.repository";
import { TransactionController } from "./transaction.controller";

const dbRepository = new PrismaRepository();
export const transactionUseCase = new TransactionUseCase(
  dbRepository,
  campaignUseCase,
  subsidiaryRepository,
  shopRepository,
  rewardRepository,
  userUseCase,
  pointUseCase
);

export const transactionController = new TransactionController(
  transactionUseCase
);
