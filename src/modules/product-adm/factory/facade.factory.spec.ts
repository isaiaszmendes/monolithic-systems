import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { ProductAdmFacadeFactory } from "./facade.factory";

describe('ProductAdmFacade Factory Test', () => {
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
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: '1',
      name: 'product name',
      description: 'product description',
      purchasePrice: 10,
      stock: 10,
    }

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: input.id } });

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);
  });

  it('should check stock', async () => {
    const productFacade = ProductAdmFacadeFactory.create();
    const input = {
      id: '1',
      name: 'product name',
      description: 'product description',
      purchasePrice: 10,
      stock: 10,
    }

    await productFacade.addProduct(input);
    const result = await productFacade.checkStock({ productId: input.id });

    expect(result.productId).toBe(input.id);
    expect(result.stock).toBe(input.stock);
    
  });
})