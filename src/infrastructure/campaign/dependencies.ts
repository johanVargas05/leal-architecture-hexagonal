import { CampaignUseCase } from "@application/campaign/campaign.use-case";
import { PrismaRepository as SubsidiaryPrismaRepository } from "@infrastructure/subsidiary/repository/prisma.repository";

import { CampaignController } from "./campaign.controller";
import { PrismaRepository } from "./repository/prisma.repository";

const dbRepository = new PrismaRepository();
const subsidiaryPrismaRepository = new SubsidiaryPrismaRepository();

const campaignUseCase = new CampaignUseCase(
  dbRepository,
  subsidiaryPrismaRepository
);
export const campaignController = new CampaignController(campaignUseCase);
