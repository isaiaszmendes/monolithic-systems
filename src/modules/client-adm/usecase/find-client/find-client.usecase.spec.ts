import { Client } from "../../domain/client-adm.entity";
import { FindClientUseCase } from "./find-client.usecase";

const client = new Client({
  name: 'John Silva',
  email: 'john.silva@email.com',
  address: '1234 Elm Street',  
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
    expect(output.address).toBe(client.address);
  });
}) ;