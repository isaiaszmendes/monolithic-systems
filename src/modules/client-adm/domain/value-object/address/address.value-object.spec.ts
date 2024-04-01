import { Address } from "./address.value-object";

describe('Address Value Object Unit Test', () => {
  it('should be defined', () => {
    expect(Address).toBeDefined();
  });

  it('should create a valid address', () => {
    const props = {
      city: 'São Paulo',
      complement: 'apto 123',
      number: '123',
      state: 'SP',
      street: 'Rua teste',
      zipCode: '12345678',
    }
    const address = new Address(props);
    expect(address.city).toEqual(props.city);
    expect(address.complement).toEqual(props.complement);
    expect(address.number).toEqual(props.number);
    expect(address.state).toEqual(props.state);
    expect(address.street).toEqual(props.street);
    expect(address.zipCode).toEqual(props.zipCode);
  });

  it(`should throw erro if don't pass some required field`, () => {
    const props = {
      city: 'São Paulo',
      complement: 'apto 123',
      number: '123',
      state: 'SP',
      street: '',
      zipCode: '12345678',
    }
    expect(() => new Address(props)).toThrowError('Street is required');
  });
});