import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { PaymentFacadeInputDto, PaymentFacadeInterface, PaymentFacadeOutputDto } from "./payment.facade.interface";

type UseCasesProps = {
  processPaymentUseCase: UseCaseInterface
}

export class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUseCase: UseCaseInterface;
  constructor(private useCasesProps: UseCasesProps) {
    this._processPaymentUseCase = useCasesProps.processPaymentUseCase;
  }
  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this._processPaymentUseCase.execute(input);
  }  
} 