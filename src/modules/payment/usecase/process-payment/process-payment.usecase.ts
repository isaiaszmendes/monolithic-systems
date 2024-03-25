import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { Transaction } from "../../domain/transaction.entity";
import { PaymentGateway } from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.usecase.dto";

export class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(private readonly transactionRepository: PaymentGateway) {}
  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });

    transaction.process();

    const persistedTransaction = await this.transactionRepository.save(transaction);

    return {
      transactionId: persistedTransaction.id.id,
      orderId: persistedTransaction.orderId,
      amount: persistedTransaction.amount,
      status: persistedTransaction.status,
      createdAt: persistedTransaction.createdAt,
      updatedAt: persistedTransaction.updatedAt,
    }
  }

}