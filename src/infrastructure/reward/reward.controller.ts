import { RewardUseCase } from "@application/reward/reward.use-case";
import { Request, Response } from "express";

export class RewardController {
  constructor(private rewardUseCase: RewardUseCase) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;
    const { code, ok, data, message, error } = await this.rewardUseCase.create(
      body
    );
    res.status(code).json({ ok, message, data, error });
  };

  public findAllByShop = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, message, error } =
      await this.rewardUseCase.findAllByShop(id);
    res.status(code).json({ ok, message, data, error });
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, message, error } =
      await this.rewardUseCase.findById(id);
    res.status(code).json({ ok, message, data, error });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const { body, params } = req;
    const id = params.id;
    const { code, ok, data, message, error } = await this.rewardUseCase.update(
      id,
      body
    );
    res.status(code).json({ ok, message, data, error });
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, message, error } = await this.rewardUseCase.delete(
      id
    );
    res.status(code).json({ ok, message, data, error });
  };
}
