import { Address } from "../../domain/value-object/address/address.value-object";
import { InvoiceItem } from "../../domain/invoice-item.entity";
import { Invoice } from "../../domain/invoice.entity";
import { GenerateInvoiceUseCase } from "./generate-invoice.usecase";
import { Id } from "../../../@shared/domain/value-object/id.value-object";

const addressProps = {
  city: "campinas",
  complement: "casa",
  number: "58",
  state: "SP",
  street: "rua dos bobos",
  zipCode: "123123",
}
const address = new Address(addressProps);

const invoiceItemProps = {
  id: new Id('1'),
  name: "monitor",
  price: 5600,
}
const invoiceItem = new InvoiceItem(invoiceItemProps);

const invoiceItemProps2 = {
  id: new Id('2'),
  name: "light bar",
  price: 160,
}

const invoiceItem2 = new InvoiceItem(invoiceItemProps2);

const invoiceProps = {
  name: "joao",
  document: "123123",
}
const invoice = new Invoice({
  ...invoiceProps,
  address,
  items: [invoiceItem, invoiceItem2],
});

const MockRepository = () => ({
  find: jest.fn(),
  generate: jest.fn().mockResolvedValue(Promise.resolve(invoice)),
});

describe('GenerateInvoice UseCase Unit Test', () => {
  it('should generate invoice', async () => {
    const invoiceRepository = MockRepository();
    const useCase = new GenerateInvoiceUseCase(invoiceRepository);

    const input = {
      ...invoiceProps,
      ...addressProps,
      items: [
        {
          ...invoiceItemProps,
          id: '1',
        },
        {
          ...invoiceItemProps2,
          id: '2',
        }
      ],
    };

    const output = await useCase.execute(input);

    expect(output.id).toBe(invoice.id.id);
    expect(output.name).toBe(invoice.name);
    expect(output.document).toBe(invoice.document);
    expect(output.city).toBe(invoice.address.city);
    expect(output.complement).toBe(invoice.address.complement);
    expect(output.number).toBe(invoice.address.number);
    expect(output.state).toBe(invoice.address.state);
    expect(output.street).toBe(invoice.address.street);
    expect(output.zipCode).toBe(invoice.address.zipCode);
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

    expect(output.total).toBe(5760); // 5760
  });
});
