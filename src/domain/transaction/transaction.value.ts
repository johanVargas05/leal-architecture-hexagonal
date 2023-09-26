import { v4 as uuid } from "uuid";

import { TransactionEntity } from "./transaction.entity";

export class TransactionValue implements TransactionEntity {
  id: string;
  user_id: string;
  subsidiary_id: string;
  type_transaction: string;
  type_currency: string;
  description: string;
  valor: number;
  real_money?: number | null;
  created_at: Date;
  updated_at: Date;

  constructor(
    data: Omit<TransactionEntity, "id" | "created_at" | "updated_at">
  ) {
    this.id = uuid();
    this.user_id = data.user_id;
    this.subsidiary_id = data.subsidiary_id;
    this.type_transaction = data.type_transaction;
    this.type_currency = data.type_currency;
    this.description = data.description;
    this.valor = data.valor;
    this.real_money = data?.real_money || null;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
