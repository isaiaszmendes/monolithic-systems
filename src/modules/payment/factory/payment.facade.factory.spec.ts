import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository/transaction.model";
import { PaymentFacadeFactory } from "./payment.facade.factory";

describe('PaymentFacadeFactory', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

	afterEach(async () => {
		await sequelize.close();
	});

  it('should create a transaction', async () => {
    const paymentFacadeFactory = PaymentFacadeFactory.create();

    const input = {
      orderId: '1',
      amount: 100
    };

    const result = await paymentFacadeFactory.process(input);
    expect(result.transactionId).toBeDefined();
    expect(result.orderId).toBe(input.orderId);
    expect(result.amount).toBe(input.amount);
    expect(result.status).toBe('approved');
  });

  it('should decline a transaction', async () => {
    const paymentFacadeFactory = PaymentFacadeFactory.create();

    const input = {
      orderId: '1',
      amount: 80
    };

    const result = await paymentFacadeFactory.process(input);
    expect(result.transactionId).toBeDefined();
    expect(result.orderId).toBe(input.orderId);
    expect(result.amount).toBe(input.amount);
    expect(result.status).toBe('declined');
  });
});