import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { ClientGateway } from "../../gateway/client.gateway";
import { FindClientInputDTO, FindClientOutputDTO } from "./find-client.usecase.dto";

export class FindClientUseCase implements UseCaseInterface {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
    const client = await this.clientRepository.find(input.id);
    
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}