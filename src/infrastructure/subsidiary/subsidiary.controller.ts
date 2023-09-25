import { SubsidiaryUseCase } from "@application/subsidiary/subsidiary.use-case";
import { Request, Response } from "express";

export class SubsidiaryController {
  constructor(private shopUseCase: SubsidiaryUseCase) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    const { body, params } = req;
    const shopId = params.id;
    const { code, ok, data, message, error } =
      await this.shopUseCase.createSubsidiary(shopId, body);
    res.status(code).json({ ok, message, data, error });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const { body, params } = req;
    const id = params.id;
    const { code, ok, data, message, error } =
      await this.shopUseCase.updateSubsidiary(id, body);
    res.status(code).json({ ok, message, data, error });
  };

  public findAll = async (req: Request, res: Response): Promise<void> => {
    const { params } = req;
    const shopId = params.id;
    const { ok, data, code, error, message } =
      await this.shopUseCase.findAllSubsidiaries(shopId);
    res.status(code).json({ data, ok, error, message });
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
