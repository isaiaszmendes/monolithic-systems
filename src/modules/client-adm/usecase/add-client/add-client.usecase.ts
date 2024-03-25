import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { Client } from "../../domain/client-adm.entity";
import { ClientGateway } from "../../gateway/client.gateway";
import { AddClientInputDTO, AddClientOutputDTO } from "./add-client.usecase.dto";

export class AddClientUseCase implements UseCaseInterface {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
    const props = {
      id: new Id(input?.id),
      name: input.name,
      email: input.email,
      address: input.address,
    };

    const client = new Client(props);
    await this.clientRepository.add(client);
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }
}