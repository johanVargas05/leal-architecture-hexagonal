import { UserEntity } from "./user.entity";

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  findAll(): Promise<Array<UserEntity>>;
  create(data: UserEntity): Promise<UserEntity>;
  update(
    id: string,
    data: {
      name?: string;
      email?: string;
      balance_coins?: number;
      updated_at: Date;
    }
  ): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
}
