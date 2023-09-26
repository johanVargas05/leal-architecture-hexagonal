import { PointUseCase } from "@application/point/point.use-case";
import { Request, Response } from "express";

export class PointController {
  constructor(private pointUseCase: PointUseCase) {}

  public findPointsUserByShop = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.params.user;
    const shopId = req.params.shop;
    const { code, ok, data, message, error } =
      await this.pointUseCase.getPoints(userId, shopId);
    res.status(code).json({ ok, message, data, error });
  };
}
