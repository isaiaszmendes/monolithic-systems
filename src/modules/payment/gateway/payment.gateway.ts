import { Transaction } from "../domain/transaction.entity";

export interface PaymentGateway {
  save(transaction: Transaction): Promise<Transaction>
}