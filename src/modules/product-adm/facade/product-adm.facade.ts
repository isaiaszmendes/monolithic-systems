import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
  ProductAdmFacadeInterface,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(useCasesProps: UseCasesProps) {
    this._addProductUseCase = useCasesProps.addUseCase;
    this._checkStockUseCase = useCasesProps.stockUseCase;
    
  }

  addProduct(input: AddProductFacadeInputDTO): Promise<void> {
    // caso o dto do caso de uso seja diferente do dto da facade, aqui é feita a conversão
    // converter o dto da facade para o dto do caso de uso
    return this._addProductUseCase.execute(input);
  }

  checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    // caso o dto do caso de uso seja diferente do dto da facade, aqui é feita a conversão
    // converter o dto da facade para o dto do caso de uso
    return this._checkStockUseCase.execute(input);
  }
  
}