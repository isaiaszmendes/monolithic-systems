import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository/transaction.model";
import { TransactionRepository } from "../repository/transaction.repository";
import { ProcessPaymentUseCase } from "../usecase/process-payment/process-payment.usecase";
import { PaymentFacade } from "./payment.facade";

describe('PaymentFacade Test', () => {
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
    const transactionRepository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);
    const paymentFacade = new PaymentFacade({
      processPaymentUseCase: processPaymentUseCase
    });

    const input = {
      orderId: '1',
      amount: 100
    };

    const result = await paymentFacade.process(input);

    expect(result.transactionId).toBeDefined();
    expect(result.orderId).toBe(input.orderId);
    expect(result.amount).toBe(input.amount);
    expect(result.status).toBe('approved');
  });
});
