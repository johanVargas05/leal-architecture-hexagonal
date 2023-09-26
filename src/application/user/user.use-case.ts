import { ResponseEntity } from "@domain/shared/response.entity";
import { UserEntity } from "@domain/user/user.entity";
import { UserRepository } from "@domain/user/user.repository";
import { UserValue } from "@domain/user/user.value";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: {
    name: string;
    email: string;
    balance?: number;
  }): Promise<ResponseEntity<UserEntity>> {
    try {
      if (typeof data?.name !== "string" || typeof data.email !== "string")
        return {
          ok: false,
          message: "Bad request or invalid input",
          code: 400,
        };
      const userValue = new UserValue(data);
      const userCreated = await this.userRepository.create(userValue);
      return { ok: true, data: userCreated, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async findAll(): Promise<ResponseEntity<Array<UserEntity>>> {
    try {
      const users = await this.userRepository.findAll();
      if (users.length === 0)
        return {
          ok: false,
          message: `There are not users`,
          code: 404,
        };
      return { ok: true, data: users, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async findById(userId: string): Promise<ResponseEntity<UserEntity>> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user)
        return {
          ok: false,
          message: `User with id ${userId} not found`,
          code: 404,
        };
      return { ok: true, data: user, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async update(
    userId: string,
    data: { name?: string; email?: string }
  ): Promise<ResponseEntity<UserEntity>> {
    try {
      const updated_at = new Date();
      const subsidiaryUpdated = await this.userRepository.update(userId, {
        ...data,
        updated_at,
      });
      return { ok: true, data: subsidiaryUpdated, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async updateBalance(
    userId: string,
    balance: number
  ): Promise<ResponseEntity<UserEntity>> {
    try {
      const updated_at = new Date();
      const subsidiaryUpdated = await this.userRepository.update(userId, {
        balance_coins: balance,
        updated_at,
      });
      return { ok: true, data: subsidiaryUpdated, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async delete(userId: string): Promise<ResponseEntity<UserEntity>> {
    try {
      const { error, code, ok, message } = await this.findById(userId);
      if (error) return { ok, error, code, message };

      const user = await this.userRepository.delete(userId);

      return { ok: true, data: user, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }
}
