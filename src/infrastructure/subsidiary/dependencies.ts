import { SubsidiaryUseCase } from "@application/subsidiary/subsidiary.use-case";

import { PrismaRepository } from "./repository/prisma.repository";
import { SubsidiaryController } from "./subsidiary.controller";

const dbRepository = new PrismaRepository();
const shopUseCase = new SubsidiaryUseCase(dbRepository);
export const subsidiaryController = new SubsidiaryController(shopUseCase);
