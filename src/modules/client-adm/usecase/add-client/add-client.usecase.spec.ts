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
      address: '1234 Elm Street',
    };

    const output = await useCase.execute(input);
    expect(clientRepository.add).toHaveBeenCalled();
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.email).toBe(input.email);
    expect(output.address).toBe(input.address);

  });
});