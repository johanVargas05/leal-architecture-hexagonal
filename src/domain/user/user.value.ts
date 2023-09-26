import { v4 as uuid } from "uuid";

import { UserEntity } from "./user.entity";

export class UserValue implements UserEntity {
  id: string;
  name: string;
  email: string;
  balance_coins: number;
  created_at: Date;
  updated_at: Date;
  constructor({
    name,
    email,
    balance,
  }: {
    name: string;
    email: string;
    balance?: number;
  }) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.balance_coins = balance || 0;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
