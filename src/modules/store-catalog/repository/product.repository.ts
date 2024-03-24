import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/product.entity";
import { ProductGateway } from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const result = await ProductModel.findAll();
    return result.map(
      (product) => new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })
    );
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findByPk(id);

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}