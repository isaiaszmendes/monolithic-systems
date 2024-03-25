import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { AddClientFacadeInputDTO, ClientAdmFacadeInterface, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._addUseCase = useCaseProps.addUseCase;
    this._findUseCase = useCaseProps.findUseCase;
  }

  async add(input: AddClientFacadeInputDTO): Promise<void> {
    await this._addUseCase.execute(input);
  }

  async find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
    const client = await this._findUseCase.execute(input);

    return {
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
  
}