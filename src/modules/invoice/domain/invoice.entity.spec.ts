import { InvoiceItems } from "./invoice-items.entity";
import { Invoice } from "./invoice.entity";
import { Address } from "./value-object/address/address.value-object";

describe('Invoice Entity Unit Test', () => {
  it('should be defined', () => {
    expect(Invoice).toBeDefined();
  });

  it('should create a valid invoice', () => {
    const invoiceProps = {
      name: 'João',
      document: '123456789',
    };

    const addressProps = {
      city: 'São Paulo',
      complement: 'apto 123',
      number: '123',
      state: 'SP',
      street: 'Rua teste',
      zipCode: '12345678',
    };

    const invoiceItemProps1 = {
      name: 'item 1',
      price: 90,
    };

    const invoiceItemProps2 = {
      name: 'item 2',
      price: 100,
    };

    const address = new Address(addressProps);
    const invoiceItem1 = new InvoiceItems(invoiceItemProps1);
    const invoiceItem2 = new InvoiceItems(invoiceItemProps2);

    const invoice = new Invoice({
      ...invoiceProps,
      address,
      items: [invoiceItem1, invoiceItem2]
    });

    expect(invoice.name).toEqual(invoiceProps.name);
    expect(invoice.document).toEqual(invoiceProps.document);
    expect(invoice.address).toEqual(address);
    expect(invoice.items[0]).toEqual(invoiceItem1);
    expect(invoice.items[1]).toEqual(invoiceItem2);
  });

  it('should add a item to invoice', () => {
    const invoiceProps = {
      name: 'João',
      document: '123456789',
    };

    const addressProps = {
      city: 'São Paulo',
      complement: 'apto 123',
      number: '123',
      state: 'SP',
      street: 'Rua teste',
      zipCode: '12345678',
    };

    const invoiceItemProps1 = {
      name: 'item 1',
      price: 90,
    };

    const invoiceItemProps2 = {
      name: 'item 2',
      price: 100,
    };

    const address = new Address(addressProps);
    const invoiceItem1 = new InvoiceItems(invoiceItemProps1);

    const invoice = new Invoice({
      ...invoiceProps,
      address,
      items: [invoiceItem1]
    });

    const invoiceItem2 = new InvoiceItems(invoiceItemProps2);
    invoice.addItem(invoiceItem2);

    expect(invoice.items.length).toBe(2);
    expect(invoice.items[0]).toEqual(invoiceItem1);
    expect(invoice.items[1]).toEqual(invoiceItem2);
  });
});