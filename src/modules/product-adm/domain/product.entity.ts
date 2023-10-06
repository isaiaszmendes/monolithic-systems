import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _description: string;
  private _purchasePrice: number;
  private _stock: number;

  constructor() {
    super();
  }


}