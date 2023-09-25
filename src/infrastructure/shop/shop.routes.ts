import { Router } from "express";

import { shopController } from "./dependencies";

const route = Router();
route.get("/", shopController.findAll);
route.get("/:id", shopController.findById);
route.post("/", shopController.create);
route.patch("/:id", shopController.update);
route.delete("/:id", shopController.delete);

export default route;
