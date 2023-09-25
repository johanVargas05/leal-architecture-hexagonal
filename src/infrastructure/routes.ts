import shopRoutes from "@infrastructure/shop/shop.routes";
import subsidiaryRoutes from "@infrastructure/subsidiary/subsidiary.routes";
import { Router } from "express";

const route = Router();
route.use(shopRoutes);
route.use("/shop", subsidiaryRoutes);
export default route;
