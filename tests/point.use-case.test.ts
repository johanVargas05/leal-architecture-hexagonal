import { PointRepository } from "@domain/point/point.repository";
import { PointValue } from "@domain/point/point.value";

export class PointUseCase {
  constructor(private readonly pointRepository: PointRepository) {}

  async getPoints(userId: string, shopId: string) {
    try {
      const result = await this.pointRepository.findPointsByUser(
        userId,
        shopId
      );
      if (!result) {
        return {
          ok: false,
          message: "The user does not have points in this store",
          code: 404,
        };
      }
      return { ok: true, data: result.balance_points, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async upsert(data: { userId: string; shopId: string; balance: number }) {
    try {
      const campaignValue = new PointValue(data);
      const result = await this.pointRepository.upsert(campaignValue);
      return { ok: true, data: result, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }
}

describe("getPoints", () => {
  // Returns 500 if an error occurs in the repository
  it("should return 500 when an error occurs in the repository", async () => {
    // Arrange
    const userId = "user1";
    const shopId = "shop1";
    const error = new Error("Repository error");
    const pointRepositoryMock: PointRepository = {
      findPointsByUser: jest.fn().mockRejectedValue(error),
      upsert: jest.fn().mockRejectedValue(error),
    };
    const pointUseCase = new PointUseCase(pointRepositoryMock);

    // Act
    const result = await pointUseCase.getPoints(userId, shopId);

    // Assert
    expect(result).toEqual({
      ok: false,
      message: "Internal server error",
      code: 500,
      error,
    });
    expect(pointRepositoryMock.findPointsByUser).toHaveBeenCalledWith(
      userId,
      shopId
    );
  });
});
