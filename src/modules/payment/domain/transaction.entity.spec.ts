import { Transaction } from "./transaction.entity";

describe('Transaction Entity', () => {
  it('should be defined', () => {
    const props = {
      amount: 100,
      orderId: 'order-id',
      status: 'pending'
    }
    const transaction = new Transaction(props)
    expect(transaction).toBeDefined();
  });

  it('should approve transaction', () => {
    const props = {
      amount: 100,
      orderId: 'order-id',
    }
    const transaction = new Transaction(props)
    transaction.approve();
    expect(transaction.status).toBe('approved');
  });

  it('should decline transaction', () => {
    const props = {
      amount: 90,
      orderId: 'order-id',
    }

    const transaction = new Transaction(props);
    transaction.decline();
    expect(transaction.status).toBe('declined');
  })
});