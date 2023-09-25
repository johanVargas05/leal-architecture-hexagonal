import { ResponseEntity } from "@domain/shared/response.entity";
import { SubsidiaryEntity } from "@domain/subsidiary/subsidiary.entity";
import { SubsidiaryRepository } from "@domain/subsidiary/subsidiary.repository";
import { SubsidiaryValue } from "@domain/subsidiary/subsidiary.value";

export class SubsidiaryUseCase {
  constructor(private readonly subsidiaryRepository: SubsidiaryRepository) {}
  async createSubsidiary(
    shopId: string,
    data: {
      name: string;
    }
  ): Promise<ResponseEntity<SubsidiaryEntity>> {
    try {
      const subsidiaryValue = new SubsidiaryValue(data);
      const subsidiaryCreated = await this.subsidiaryRepository.create(
        shopId,
        subsidiaryValue
      );
      return { ok: true, data: subsidiaryCreated, code: 201 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async findAllSubsidiaries(
    shopId: string
  ): Promise<ResponseEntity<SubsidiaryEntity[]>> {
    const data = await this.subsidiaryRepository.finAll(shopId);
    return { ok: true, data, code: 200 };
  }

  async findById(
    subsidiaryId: string
  ): Promise<ResponseEntity<SubsidiaryEntity>> {
    try {
      const subsidiary = await this.subsidiaryRepository.findById(subsidiaryId);
      if (!subsidiary)
        return {
          ok: false,
          message: `subsidiary with id ${subsidiaryId} not found`,
          code: 404,
        };
      return { ok: true, data: subsidiary, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async updateSubsidiary(
    subsidiaryId: string,
    data: { name?: string }
  ): Promise<ResponseEntity<SubsidiaryEntity>> {
    try {
      const updated_at = new Date();
      const subsidiaryUpdated = await this.subsidiaryRepository.update(
        subsidiaryId,
        {
          ...data,
          updated_at,
        }
      );
      return { ok: true, data: subsidiaryUpdated, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }

  async delete(
    subsidiaryId: string
  ): Promise<ResponseEntity<SubsidiaryEntity>> {
    try {
      const { error, code, ok, message } = await this.findById(subsidiaryId);
      if (error) return { ok, error, code, message };

      const subsidiary = await this.subsidiaryRepository.delete(subsidiaryId);

      return { ok: true, data: subsidiary, code: 200 };
    } catch (error) {
      return { ok: false, message: "Internal server error", code: 500, error };
    }
  }
}
