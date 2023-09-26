import { TransactionUseCase } from "@application/transaction/transaction.use-case";
import { Request, Response } from "express";

export class TransactionController {
  constructor(private transactionUseCase: TransactionUseCase) {}

  public purchaseInSubsidiary = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const request = req.body;
    const { ok, code, data, error, message } =
      await this.transactionUseCase.purchaseInSubsidiary(request);
    res.status(code).json({ ok, data, error, message });
  };

  public redeemInSubsidiary = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const request = req.body;
    const { ok, code, data, error, message } =
      await this.transactionUseCase.redeemInSubsidiary(request);
    res.status(code).json({ ok, data, error, message });
  };

  public findByShop = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { ok, code, data, message } =
      await this.transactionUseCase.findByShop(id);
    res.status(code).json({ ok, data, message });
  };

  public findBySubsidiary = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = req.params.id;
    const { ok, code, data, message } =
      await this.transactionUseCase.findBySubsidiary(id);
    res.status(code).json({ ok, data, message });
  };

  public findByUser = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { ok, code, data, message } =
      await this.transactionUseCase.findByUser(id);
    res.status(code).json({ ok, data, message });
  };
}
