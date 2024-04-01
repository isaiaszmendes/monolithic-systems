import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { Client } from "../../domain/client-adm.entity";
import { Address } from "../../domain/value-object/address/address.value-object";
import { ClientGateway } from "../../gateway/client.gateway";
import { AddClientInputDTO, AddClientOutputDTO } from "./add-client.usecase.dto";

export class AddClientUseCase implements UseCaseInterface {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
    const props = {
      id: new Id(input?.id),
      name: input.name,
      email: input.email,
      document: input.document,
    };

    const addressProps = {
      city: input.city,
      complement: input.complement,
      number: input.number,
      state: input.state,
      street: input.street,
      zipCode: input.zipCode,
    };

    const address = new Address(addressProps);

    const client = new Client({
      ...props,
      address,
    });
    await this.clientRepository.add(client);
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