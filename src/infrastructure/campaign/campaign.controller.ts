import { CampaignUseCase } from "@application/campaign/campaign.use-case";
import { Request, Response } from "express";

export class CampaignController {
  constructor(private campaignUseCase: CampaignUseCase) {}

  public createCampaignShop = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { body, params } = req;
    const id = params.id;
    const { code, ok, data, message, error } =
      await this.campaignUseCase.createCampaignShop(body, id);
    res.status(code).json({ ok, message, data, error });
  };

  public createCampaignSubsidiary = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { body, params } = req;
    const id = params.id;
    const { code, ok, data, message, error } =
      await this.campaignUseCase.createCampaignSubsidiary(body, id);
    res.status(code).json({ ok, message, data, error });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const { body, params } = req;
    const id = params.id;
    const { code, ok, data, message, error } =
      await this.campaignUseCase.updateCampaign(id, body);
    res.status(code).json({ ok, message, data, error });
  };

  public findByShop = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { ok, data, code } = await this.campaignUseCase.findCampaignsByShop(
      id
    );
    res.status(code).json({ data, ok });
  };

  public findBySubsidiary = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = req.params.id;
    const { ok, data, code } =
      await this.campaignUseCase.findCampaignsBySubsidiary(id);
    res.status(code).json({ data, ok });
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, error, message } =
      await this.campaignUseCase.findById(id);
    res.status(code).json({ ok, data, error, message });
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, error, message } =
      await this.campaignUseCase.delete(id);
    res.status(code).json({ ok, data, error, message });
  };
}
