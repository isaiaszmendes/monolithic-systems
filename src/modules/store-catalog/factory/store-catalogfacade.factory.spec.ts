import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { StoreCatalogFacadeFactory } from "../factory/store-catalogfacade.factory";

describe('StoreCatalogFacade Factory', () => {
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

  it('should find a product', async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const input = {
      id: '1',
      name: 'product name',
      description: 'product description',
      salesPrice: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ProductModel.create(input);

    const product = await storeCatalogFacade.find({ id: input.id });

    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.salesPrice).toBe(input.salesPrice);
  });

  it('should find all products', async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const input1 = {
      id: '1',
      name: 'product name',
      description: 'product description',
      salesPrice: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const input2 = {
      id: '2',
      name: 'product name',
      description: 'product description',
      salesPrice: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ProductModel.create(input1);
    await ProductModel.create(input2);

    const result = await storeCatalogFacade.findAll();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe(input1.id);
    expect(result.products[0].name).toBe(input1.name);
    expect(result.products[0].description).toBe(input1.description);
    expect(result.products[0].salesPrice).toBe(input1.salesPrice);
    expect(result.products[1].id).toBe(input2.id);
    expect(result.products[1].name).toBe(input2.name);
    expect(result.products[1].description).toBe(input2.description);
    expect(result.products[1].salesPrice).toBe(input2.salesPrice);
  });
});