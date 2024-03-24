import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.useCase";
import { FindProductUseCase } from "../usecase/find-product/find-product.usecase";
import { 
  FindAllStoreCatalogFacadeOutputDTO,
  FindStoreCatalogFacadeInputDTO,
  FindStoreCatalogFacadeOutputDTO,
  StoreCatalogFacadeInterface
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: any;
  findAllUseCase: any;
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _find: FindProductUseCase;
  private _findAll: FindAllProductsUseCase;

  constructor(props: UseCaseProps) {
    this._find = props.findUseCase;
    this._findAll = props.findAllUseCase;
  }

  async find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
    return await this._find.execute(id);
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDTO> {
    return await this._findAll.execute();
  }
}