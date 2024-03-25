import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../../domain/transaction.entity";
import { ProcessPaymentUseCase } from "./process-payment.usecase";

const transactionApproved = new Transaction({
  id: new Id('1'),
  amount: 100,
  orderId: '1',
  status: 'approved',
});

const MockRepositoryApproved = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(transactionApproved)),
});

const transactionDeclined = new Transaction({
  id: new Id('1'),
  amount: 90,
  orderId: '1',
  status: 'declined',
});

const MockRepositoryDeclined = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
});

describe('Process Payment UseCase Unit Test', () => {
  it('should approve a transaction', async () => {
    const paymentRepository = MockRepositoryApproved();
    const useCase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: '1',
      amount: 100,
    };
    const output = await useCase.execute(input);

    expect(paymentRepository.save).toHaveBeenCalled();
    expect(output.transactionId).toBe('1');
    expect(output.orderId).toBe('1');
    expect(output.status).toBe('approved');
    expect(output.amount).toBe(100); 
    expect(output.createdAt).toBe(transactionApproved.createdAt);
    expect(output.updatedAt).toBe(transactionApproved.updatedAt);
  });

  it('should decline a transaction', async () => {
    const paymentRepository = MockRepositoryDeclined();
    const useCase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: '1',
      amount: 90,
    };
    const output = await useCase.execute(input);

    expect(paymentRepository.save).toHaveBeenCalled();
    expect(output.transactionId).toBe('1');
    expect(output.orderId).toBe('1');
    expect(output.status).toBe('declined');
    expect(output.amount).toBe(90); 
    expect(output.createdAt).toBe(transactionDeclined.createdAt);
    expect(output.updatedAt).toBe(transactionDeclined.updatedAt);
  });
});