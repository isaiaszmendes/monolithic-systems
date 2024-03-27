import { Address } from "../../domain/value-object/address/address.value-object";
import { InvoiceItem } from "../../domain/invoice-item.entity";
import { Invoice } from "../../domain/invoice.entity";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

const address = new Address({
  city: "campinas",
  complement: "apto 123",
  number: "123",
  state: "SP",
  street: "rua 123",
  zipCode: "123123",
});

const invoiceItem = new InvoiceItem({
  name: "cadeira",
  price: 1800,
});
const invoiceItem2 = new InvoiceItem({
  name: "mesa geniodesk",
  price: 5400,
});
const invoice = new Invoice({
  name: "joao",
  document: "123123",
  address,
  items: [invoiceItem, invoiceItem2],
});

const MockRepository = () => ({
  find: jest.fn().mockResolvedValue(Promise.resolve(invoice)),
  generate: jest.fn(),
});


describe('FindInvoice UseCase Unit Test', () => {
  it('should find invoice', async () => {

    const invoiceRepository = MockRepository();
    const useCase = new FindInvoiceUseCase(invoiceRepository);

    const input = {
      id: invoice.id.id,
    };
    
    const output = await useCase.execute(input);

    expect(output.id).toBe(invoice.id.id);
    expect(output.name).toBe(invoice.name);
    expect(output.document).toBe(invoice.document);
    expect(output.address).toEqual({
      city: invoice.address.city,
      complement: invoice.address.complement,
      number: invoice.address.number,
      state: invoice.address.state,
      street: invoice.address.street,
      zipCode: invoice.address.zipCode,
    });
    expect(output.items).toEqual([
      {
        id: invoice.items[0].id.id,
        name: invoice.items[0].name,
        price: invoice.items[0].price,
      },
      {
        id: invoice.items[1].id.id,
        name: invoice.items[1].name,
        price: invoice.items[1].price,
      }
    ]);
    expect(output.total).toBe(invoice.total);
  });
});