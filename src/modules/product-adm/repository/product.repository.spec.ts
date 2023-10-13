import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { Product } from "../domain/product.entity";
import { ProductRepository } from "./product.repository";

describe('Product Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {

    const productProps = {
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
    }
    const product = new Product(productProps);
    const productRepository = new ProductRepository();

    await productRepository.add(product);

    const productDb = await ProductModel.findOne({ where: { id: product.id } });
    
    expect(product.id.id).toEqual(productDb.id);
    expect(product.name).toEqual(productDb.name);
    expect(product.description).toEqual(productDb.description);
    expect(product.purchasePrice).toEqual(productDb.purchasePrice);
    expect(product.stock).toEqual(productDb.stock);
  });
});