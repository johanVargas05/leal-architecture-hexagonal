import { TransactionEntity } from "./transaction.entity";

export interface TransactionRepository {
  findByShop(shopId: string): Promise<Array<TransactionEntity> | []>;
  findBySubsidiary(
    subsidiaryId: string
  ): Promise<Array<TransactionEntity> | []>;
  findByUser(userId: string): Promise<Array<TransactionEntity> | []>;
  create(data: TransactionEntity): Promise<TransactionEntity>;
}
