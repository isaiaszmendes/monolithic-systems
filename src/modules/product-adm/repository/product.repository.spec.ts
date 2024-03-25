import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { Product } from "../domain/product.entity";
import { ProductRepository } from "./product.repository";
import { Id } from "../../@shared/domain/value-object/id.value-object";

describe('Product Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

	afterEach(async () => {
		await sequelize.close();
	});

  it('should create a product', async () => {
    const productProps = {
      id: new Id("1"),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
    }
    const product = new Product(productProps);
    const productRepository = new ProductRepository();

    await productRepository.add(product);

    const productDb = await ProductModel.findOne({ where: { id: product.id.id } });
    
    expect(productDb.id).toEqual(product.id.id);
    expect(productDb.name).toEqual(product.name);
    expect(productDb.description).toEqual(product.description);
    expect(productDb.purchasePrice).toEqual(product.purchasePrice);
    expect(productDb.stock).toEqual(product.stock);
  });

  it('should find a product', async () => {
    const product = await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    const productRepository = new ProductRepository();
    const result = await productRepository.find('1');

    expect(result.id.id).toEqual(product.id);
    expect(result.name).toEqual(product.name);
    expect(result.description).toEqual(product.description);
    expect(result.purchasePrice).toEqual(product.purchasePrice);
    expect(result.stock).toEqual(product.stock);
    expect(result.createdAt).toStrictEqual(product.createdAt);
    expect(result.updatedAt).toStrictEqual(product.updatedAt);
  });
});