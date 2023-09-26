import { UserUseCase } from "@application/user/user.use-case";

import { PrismaRepository } from "./repository/prisma.repository";
import { UserController } from "./user.controller";

const dbRepository = new PrismaRepository();
export const userUseCase = new UserUseCase(dbRepository);
export const userController = new UserController(userUseCase);
