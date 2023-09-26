import { UserUseCase } from "@application/user/user.use-case";
import { Request, Response } from "express";

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    const { body } = req;
    const { code, ok, data, message, error } = await this.userUseCase.create(
      body
    );
    res.status(code).json({ ok, message, data, error });
  };

  public findAll = async (req: Request, res: Response): Promise<void> => {
    const { code, ok, data, message, error } = await this.userUseCase.findAll();
    res.status(code).json({ ok, message, data, error });
  };

  public findById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, message, error } = await this.userUseCase.findById(
      id
    );
    res.status(code).json({ ok, message, data, error });
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    const { body, params } = req;
    const id = params.id;
    const { code, ok, data, message, error } = await this.userUseCase.update(
      id,
      body
    );
    res.status(code).json({ ok, message, data, error });
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { code, ok, data, message, error } = await this.userUseCase.delete(
      id
    );
    res.status(code).json({ ok, message, data, error });
  };
}
