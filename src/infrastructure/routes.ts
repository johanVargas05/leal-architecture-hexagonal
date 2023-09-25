import shopRoutes from "@infrastructure/shop/shop.routes";
import { Router } from "express";

const route = Router();
route.use("/shops", shopRoutes);
export default route;
