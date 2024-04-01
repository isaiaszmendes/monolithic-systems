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
      document: 'client document',
      street: 'client street',
      number: 'client number',
      complement: 'client complement',
      city: 'client city',
      state: 'client state',
      zipCode: 'client zipCode',
    }

    await clientFacade.add(input);

    const clientDb = await ClientModel.findOne({ where: { id: input.id } });

    expect(clientDb.id).toBe(input.id);
    expect(clientDb.name).toBe(input.name);
    expect(clientDb.email).toBe(input.email);
    expect(clientDb.document).toBe(input.document);
    expect(clientDb.street).toBe(input.street);
    expect(clientDb.number).toBe(input.number);
    expect(clientDb.complement).toBe(input.complement);
    expect(clientDb.city).toBe(input.city);
    expect(clientDb.state).toBe(input.state);
    expect(clientDb.zipCode).toBe(input.zipCode);
    expect(clientDb.createdAt).toBeDefined();
    expect(clientDb.updatedAt).toBeDefined();
  });

  it('should find a client', async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
      id: '1',
      name: 'client name',
      email: 'client email',
      document: 'client document',
      street: 'client street',
      number: 'client number',
      complement: 'client complement',
      city: 'client city',
      state: 'client state',
      zipCode: 'client zipCode',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await ClientModel.create(input);

    const client = await clientFacade.find({ id: input.id });

    expect(client.id).toBe(input.id);
    expect(client.name).toBe(input.name);
    expect(client.email).toBe(input.email);
    expect(client.document).toBe(input.document);
    expect(client.street).toBe(input.street);
    expect(client.number).toBe(input.number);
    expect(client.complement).toBe(input.complement);
    expect(client.city).toBe(input.city);
    expect(client.state).toBe(input.state);
    expect(client.zipCode).toBe(input.zipCode);
  });
});