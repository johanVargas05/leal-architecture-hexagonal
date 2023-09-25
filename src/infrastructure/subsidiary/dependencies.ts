import { SubsidiaryUseCase } from "@application/subsidiary/subsidiary.use-case";

import { PrismaRepository } from "./repository/prisma.repository";
import { SubsidiaryController } from "./subsidiary.controller";

const prismaRepository = new PrismaRepository();
const shopUseCase = new SubsidiaryUseCase(prismaRepository);
export const subsidiaryController = new SubsidiaryController(shopUseCase);
