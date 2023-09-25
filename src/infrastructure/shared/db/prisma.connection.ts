import { PrismaClient } from "@prisma/client";

export class PrismaConnection extends PrismaClient {
  private static instance: PrismaConnection | null = null;

  private constructor() {
    super();
  }

  public static getInstance(): PrismaConnection {
    if (!PrismaConnection.instance) {
      PrismaConnection.instance = new PrismaConnection();
    }
    return PrismaConnection.instance;
  }
}
