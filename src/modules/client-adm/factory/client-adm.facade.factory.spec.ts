import { Sequelize } from "sequelize-typescript";
import { ClientAdmFacadeFactory } from "./client-adm.facade.factory";
import { ClientModel } from "../repository/client.model";

describe('ClientAdmFacade Factory Test', () => {
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
    const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
      id: '1',
      name: 'client name',
      email: 'client email',
      address: 'client address',
    }

    await clientFacade.add(input);

    const clientDb = await ClientModel.findOne({ where: { id: input.id } });

    expect(clientDb.id).toBe(input.id);
    expect(clientDb.name).toBe(input.name);
    expect(clientDb.email).toBe(input.email);
    expect(clientDb.address).toBe(input.address);
    expect(clientDb.createdAt).toBeDefined();
    expect(clientDb.updatedAt).toBeDefined();
  });

  it('should find a client', async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
      id: '1',
      name: 'client name',
      email: 'client email',
      address: 'client address',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ClientModel.create(input);

    const client = await clientFacade.find({ id: input.id });

    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.address).toBe(input.address);
  });
});