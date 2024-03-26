import { ClientAdmFacade } from "../facade/client-adm.facade";
import { ClientAdmFacadeInterface } from "../facade/client-adm.facade.interface";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";

export class ClientAdmFacadeFactory {
  static create(): ClientAdmFacadeInterface {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClientUseCase = new FindClientUseCase(clientRepository);
    const clientFacade = new ClientAdmFacade({
      addUseCase: addClientUseCase,
      findUseCase: findClientUseCase,
    });

    return clientFacade;
  }
}