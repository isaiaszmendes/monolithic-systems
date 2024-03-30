import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { 
  FindInvoiceFacadeInput,
  FindInvoiceFacadeOutput,
  GenerateInvoiceFacadeInput,
  GenerateInvoiceFacadeOutput,
  InvoiceFacadeInterface,
} from "./invoice.facade.interface";

type InvoiceFacadeProps = {
  generateUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
};

export class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;

  constructor(useCaseProps: InvoiceFacadeProps) {
    this._generateUseCase = useCaseProps.generateUseCase;
    this._findUseCase = useCaseProps.findUseCase;
  }

  async generate(input: GenerateInvoiceFacadeInput): Promise<GenerateInvoiceFacadeOutput> {
    return await this._generateUseCase.execute(input);
  }

  async find(input: FindInvoiceFacadeInput): Promise<FindInvoiceFacadeOutput> {
    return await this._findUseCase.execute(input);
  }
}