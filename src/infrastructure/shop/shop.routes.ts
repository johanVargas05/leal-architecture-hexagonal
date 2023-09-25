import { Router } from "express";

import { shopController } from "./dependencies";

const route = Router();
route.get("/shops/", shopController.findAll);
route.get("/shop/:id", shopController.findById);
route.post("/shop/", shopController.create);
route.patch("/shop/:id", shopController.update);
route.delete("/shop/:id", shopController.delete);

export default route;
