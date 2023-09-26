import { RewardUseCase } from "@application/reward/reward.use-case";

import { PrismaRepository } from "./repository/prisma.repository";
import { RewardController } from "./reward.controller";

const dbRepository = new PrismaRepository();
export const rewardUseCase = new RewardUseCase(dbRepository);
export const rewardController = new RewardController(rewardUseCase);
