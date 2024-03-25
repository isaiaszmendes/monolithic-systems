import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { CheckStockUseCase } from "../usecase/check-stock/check-stock.usecase";
import { ProductAdmFacade } from "./product-adm.facade";

describe('ProductAdmFacade Test', () => {
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
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: undefined,
    });

    const input = {
      id: '1',
      name: 'product name',
      description: 'product description',
      purchasePrice: 10,
      stock: 10,
    }

    await productFacade.addProduct(input);

    const productDb = await ProductModel.findOne({ where: { id: input.id } });

    expect(productDb).toBeDefined();
    expect(productDb.id).toBe(input.id);
    expect(productDb.name).toBe(input.name);
    expect(productDb.description).toBe(input.description);
    expect(productDb.purchasePrice).toBe(input.purchasePrice);
    expect(productDb.stock).toBe(input.stock);
  });

  it('should check stock', async () => {
    const productRepository = new ProductRepository();
    
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: undefined,
      stockUseCase: checkStockUseCase,
    });

    const input = {
      id: '1',
      name: 'product name',
      description: 'product description',
      purchasePrice: 10,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ProductModel.create(input);
    const result = await productFacade.checkStock({ productId: input.id });

    expect(result.productId).toBe(input.id);
    expect(result.stock).toBe(input.stock);
  });
})