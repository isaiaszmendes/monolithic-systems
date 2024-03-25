import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "../domain/client-adm.entity";
import { ClientRepository } from "./client.repository";

describe('Client Repository test', () => {
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
    const clientProps = {
      id: new Id("1"),
      name: 'John silva',
      email: 'silva@email.com',
      address: 'Bel Street 123',
    }
    const client = new Client(clientProps);
    const clientRepository = new ClientRepository();
    await clientRepository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: client.id.id } });

    expect(clientDb.id).toEqual(client.id.id);
    expect(clientDb.name).toEqual(client.name);
    expect(clientDb.email).toEqual(client.email);
    expect(clientDb.address).toEqual(client.address);
  });

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'John silva',
      email: 'silva@email.com',
      address: 'Bel Street 123',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const clientRepository = new ClientRepository();
    const result = await clientRepository.find('1');

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});