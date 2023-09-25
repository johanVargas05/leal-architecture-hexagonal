import { Router } from "express";

import { subsidiaryController } from "./dependencies";

const route = Router();
route.get("/:id/subsidiaries", subsidiaryController.findAll);
route.get("/subsidiary/:id", subsidiaryController.findById);
route.post("/:id/subsidiary", subsidiaryController.create);
route.patch("/subsidiary/:id", subsidiaryController.update);
route.delete("/subsidiary/:id", subsidiaryController.delete);

export default route;
