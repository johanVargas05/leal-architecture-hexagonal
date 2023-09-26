import { SubsidiaryEntity } from "./subsidiary.entity";

export interface SubsidiaryRepository {
  findById(id: string): Promise<SubsidiaryEntity | null>;
  findAll(shopId: string): Promise<Array<SubsidiaryEntity> | []>;
  create(shopId: string, data: SubsidiaryEntity): Promise<SubsidiaryEntity>;
  update(
    id: string,
    data: {
      name?: string;
      updated_at: Date;
    }
  ): Promise<SubsidiaryEntity>;
  delete(id: string): Promise<SubsidiaryEntity>;
}
