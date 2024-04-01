import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "../domain/client-adm.entity";
import { ClientRepository } from "./client.repository";
import { Address } from "../domain/value-object/address/address.value-object";

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
      document: '123456789',
      address: 'Bel Street 123',
    }
    const addressProps = {
      city: 'São Paulo',
      complement: 'apto 123',
      number: '123',
      state: 'SP',
      street: 'Rua teste',
      zipCode: '12345678',
    };
    const address = new Address(addressProps);
    const client = new Client({
      ...clientProps,
      address,
    });
    const clientRepository = new ClientRepository();
    await clientRepository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: client.id.id } });

    expect(clientDb.id).toEqual(client.id.id);
    expect(clientDb.name).toEqual(client.name);
    expect(clientDb.email).toEqual(client.email);
    expect(clientDb.street).toEqual(client.address.street);
    expect(clientDb.number).toEqual(client.address.number);
    expect(clientDb.complement).toEqual(client.address.complement);
    expect(clientDb.city).toEqual(client.address.city);
    expect(clientDb.state).toEqual(client.address.state);
    expect(clientDb.zipCode).toEqual(client.address.zipCode);
  });

  it('should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'John silva',
      email: 'silva@email.com',
      document: '123456789',
      city: 'São Paulo',
      complement: 'apto 123',
      number: '123',
      state: 'SP',
      street: 'Rua teste',
      zipCode: '12345678',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const clientRepository = new ClientRepository();
    const result = await clientRepository.find('1');

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.address.street).toEqual(client.street);
    expect(result.address.number).toEqual(client.number);
    expect(result.address.complement).toEqual(client.complement);
    expect(result.address.city).toEqual(client.city);
    expect(result.address.state).toEqual(client.state);
    expect(result.address.zipCode).toEqual(client.zipCode);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });
});