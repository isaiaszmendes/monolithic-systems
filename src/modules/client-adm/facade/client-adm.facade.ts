import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { AddClientFacadeInputDTO, ClientAdmFacadeInterface, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

interface ClientAdmFacadeProps {
  addUseCase: UseCaseInterface;
  findUseCase: UseCaseInterface;
}

export class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _findUseCase: UseCaseInterface;

  constructor(useCaseProps: ClientAdmFacadeProps) {
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
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
  
}