import { Router } from "express";

import { shopController } from "./dependencies";

const route = Router();
route.get("/", shopController.findAll);
route.get("/:id", shopController.findById);
route.post("/", shopController.create);
route.delete("/:id", shopController.delete);

export default route;
