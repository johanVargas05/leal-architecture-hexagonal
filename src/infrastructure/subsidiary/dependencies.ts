import { SubsidiaryUseCase } from "@application/subsidiary/subsidiary.use-case";

import { PrismaRepository } from "./repository/prisma.repository";
import { SubsidiaryController } from "./subsidiary.controller";

export const dbRepository = new PrismaRepository();
export const subsidiaryUseCase = new SubsidiaryUseCase(dbRepository);
export const subsidiaryController = new SubsidiaryController(subsidiaryUseCase);
