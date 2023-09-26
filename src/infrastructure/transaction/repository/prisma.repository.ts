import {
  TransactionEntity,
  TYPE_CURRENCY,
  TYPE_TRANSACTION,
} from "@domain/transaction/transaction.entity";
import { TransactionRepository } from "@domain/transaction/transaction.repository";
import { PrismaConnection } from "@infrastructure/shared/db/prisma.connection";

export class PrismaRepository implements TransactionRepository {
  private prisma: PrismaConnection;
  constructor() {
    this.prisma = PrismaConnection.getInstance();
  }
  async findByShop(shopId: string): Promise<TransactionEntity[] | []> {
    return await this.prisma.transactions.findMany({
      where: {
        subsidiary: {
          shop_id: {
            equals: shopId,
          },
        },
      },
    });
  }
  async findBySubsidiary(
    subsidiaryId: string
  ): Promise<TransactionEntity[] | []> {
    return await this.prisma.transactions.findMany({
      where: {
        subsidiary: {
          id: {
            equals: subsidiaryId,
          },
        },
      },
    });
  }
  async findByUser(userId: string): Promise<TransactionEntity[] | []> {
    return await this.prisma.transactions.findMany({
      where: {
        user: {
          id: {
            equals: userId,
          },
        },
      },
    });
  }
  async create(data: TransactionEntity): Promise<TransactionEntity> {
    return await this.prisma.transactions.create({
      data: {
        ...data,
        type_currency: data.type_currency as TYPE_CURRENCY,
        type_transaction: data.type_transaction as TYPE_TRANSACTION,
      },
    });
  }
}
