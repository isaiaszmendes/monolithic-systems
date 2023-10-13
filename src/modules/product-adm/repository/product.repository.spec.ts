import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { Product } from "../domain/product.entity";

describe('Product Repository test', () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterAll(async () => {
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
    
    expect(productDb).not.toBeNull();
  });
});