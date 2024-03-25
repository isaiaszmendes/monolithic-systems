import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";
import { ClientAdmFacade } from "./client-adm.facade";

describe('ClientAdmFacade Test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

	afterEach(async () => {
		await sequelize.close();
	});

  it('should create a client', async () => {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);

    const clientFacade = new ClientAdmFacade({
      addUseCase: addClientUseCase,
      findUseCase: undefined,
    });

    const input = {
      id: '1',
      name: 'client name',
      email: 'client email',
      address: 'client address',
    };

    await clientFacade.add(input);

    const clientDb = await ClientModel.findOne({ where: { id: input.id } });

    expect(clientDb.id).toBe(input.id);
    expect(clientDb.name).toBe(input.name);
    expect(clientDb.email).toBe(input.email);
    expect(clientDb.address).toBe(input.address);
  });

  it('should find a client', async () => {
    const clientRepository = new ClientRepository();
    const addClientUseCase = new AddClientUseCase(clientRepository);
    const findClientUseCase = new FindClientUseCase(clientRepository);

    const clientFacade = new ClientAdmFacade({
      addUseCase: addClientUseCase,
      findUseCase: findClientUseCase,
    });

    const input = {
      id: '1',
      name: 'client name',
      email: 'client email',
      address: 'client address',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ClientModel.create(input);

    const client = await clientFacade.find({ id: input.id });
    
    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);    
  });
});
