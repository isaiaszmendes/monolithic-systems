import { ValueObject } from "./value-object.interface";
import { randomUUID } from "crypto";

export class Id implements ValueObject {
  private _id: string;

  constructor(id?: string) {
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }
}