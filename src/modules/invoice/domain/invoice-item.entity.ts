import { BaseEntity } from "../../@shared/domain/entity/base.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemProps = {
  id?: Id,
  name: string
  price: number
  createdAt?: Date
  updatedAt?: Date
}

export class InvoiceItem extends BaseEntity {
  private _name: string;
  private _price: number;

  constructor(props: InvoiceItemProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._price = props.price;
    this.validate();
  }

  validate(): void {
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (!this._price || this._price <= 0) {
      throw new Error('Price is required and must be greater than 0');
    }
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}