import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.useCase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase";
import { 
  FindAllStoreCatalogFacadeOutputDTO,
  FindStoreCatalogFacadeInputDTO,
  FindStoreCatalogFacadeOutputDTO,
  StoreCatalogFacadeInterface
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: UseCaseInterface;
  findAllUseCase: UseCaseInterface;
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _findUseCase: UseCaseInterface;
  private _findAllUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._findUseCase = useCaseProps.findUseCase;
    this._findAllUseCase = useCaseProps.findAllUseCase;
  }

  async find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
    return await this._findUseCase.execute(id);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDTO> {
    return await this._findAllUseCase.execute({});
  }
}