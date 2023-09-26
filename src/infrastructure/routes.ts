import campaignRoutes from "@infrastructure/campaign/campaign.routes";
import shopRoutes from "@infrastructure/shop/shop.routes";
import subsidiaryRoutes from "@infrastructure/subsidiary/subsidiary.routes";
import userRoutes from "@infrastructure/user/user.routes";
import { Router } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import { optionsSwagger } from "./shared/config";

const specs = swaggerJsDoc(optionsSwagger);

const routes = Router();
routes.use(shopRoutes);
routes.use(subsidiaryRoutes);
routes.use(campaignRoutes);
routes.use(userRoutes);
routes.use("/api", routes);

routes.get("/", (_, res) => {
  res.json({ ok: true, message: "Application loaded!" });
});

routes.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
export default routes;
