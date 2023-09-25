import { v4 as uuid } from "uuid";

import { SubsidiaryEntity } from "./subsidiary.entity";

export class SubsidiaryValue implements SubsidiaryEntity {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  constructor({ name }: { name: string }) {
    this.id = uuid();
    this.name = name;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
