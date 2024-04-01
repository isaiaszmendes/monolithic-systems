import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe('Add Client Usecase Unit Test', () => {
  it('should add a client', async () => {
    const clientRepository = MockRepository()
    const useCase = new AddClientUseCase(clientRepository);

    const input = {
      id: '1234',
      name: 'John Doe',
      email: 'john@email.com',
      document: '123456789',
      street: 'Rua teste',
      number: '123',
      complement: 'apto 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '12345678',
    };

    const output = await useCase.execute(input);
    expect(clientRepository.add).toHaveBeenCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.street).toBe(input.street);
    expect(output.number).toBe(input.number);
    expect(output.complement).toBe(input.complement);
    expect(output.city).toBe(input.city);
    expect(output.state).toBe(input.state);
    expect(output.zipCode).toBe(input.zipCode);
  });
});