import { PointUseCase } from "@application/point/point.use-case";

import { PointController } from "./points.controller";
import { PrismaRepository } from "./repository/prisma.repository";

const dbRepository = new PrismaRepository();
export const pointUseCase = new PointUseCase(dbRepository);
export const pointController = new PointController(pointUseCase);
