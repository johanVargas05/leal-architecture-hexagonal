import { ShopUseCase } from "@application/shop/shop.use-case";
import { Request, Response } from "express";

export class ShopController {
  constructor(private shopUseCase: ShopUseCase) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;
    const { code, ok, data, message, error } =
      await this.shopUseCase.createShop(body);
    res.status(code).json({ ok, message, data, error });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const { body, params } = req;
    const id = params.id;
    const { code, ok, data, message, error } =
      await this.shopUseCase.updateShop(id, body);
    res.status(code).json({ ok, message, data, error });
  };

  public findAll = async (req: Request, res: Response): Promise<void> => {
    const { ok, data, code } = await this.shopUseCase.findAllShops();
    res.status(code).json({ data, ok });
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, error, message } = await this.shopUseCase.findById(
      id
    );
    res.status(code).json({ ok, data, error, message });
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, error, message } = await this.shopUseCase.delete(
      id
    );
    res.status(code).json({ ok, data, error, message });
  };
}
