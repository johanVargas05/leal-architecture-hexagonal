export interface TransactionEntity {
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
}
export enum TYPE_TRANSACTION {
  income = "income",
  outgoing = "outgoing",
}

export enum TYPE_CURRENCY {
  coins = "coins",
  points = "points",
}
