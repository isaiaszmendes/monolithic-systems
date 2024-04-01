import { Client } from "../../domain/client-adm.entity";
import { Address } from "../../domain/value-object/address/address.value-object";
import { FindClientUseCase } from "./find-client.usecase";

const address =  new Address({
  city: 'São Paulo',
  complement: 'apto 123',
  number: '123',
  state: 'SP',
  street: 'Rua teste',
  zipCode: '12345678',
});

const client = new Client({
  name: 'John Silva',
  email: 'john.silva@email.com',
  document: '123456789',
  address,
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockResolvedValue(client),
});

describe('Find Client Usecase Unit Test', () => {
  it('should find a client', async () => {
    const clientRepository = MockRepository()
    const useCase = new FindClientUseCase(clientRepository);

    const input = {
      id: '1234',
    };

    const output = await useCase.execute(input);
    expect(clientRepository.find).toHaveBeenCalled();
    expect(output.id).toBe(client.id.id);
    expect(output.name).toBe(client.name);
    expect(output.email).toBe(client.email);
    expect(output.document).toBe(client.document);
    expect(output.street).toBe(client.address.street);
    expect(output.number).toBe(client.address.number);
    expect(output.complement).toBe(client.address.complement);
    expect(output.city).toBe(client.address.city);
    expect(output.state).toBe(client.address.state);
    expect(output.zipCode).toBe(client.address.zipCode);
  });
}) ;