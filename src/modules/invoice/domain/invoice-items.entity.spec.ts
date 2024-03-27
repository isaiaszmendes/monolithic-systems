import { InvoiceItems } from "./invoice-items.entity";

describe('InvoiceItem Entity Unit Test', () => {
  it('should be defined', () => {
    expect(InvoiceItems).toBeDefined();
  });

  it('should create a valid invoice item', () => {
    const props = {
      name: 'item 1',
      price: 90,
    };
    const invoiceItem = new InvoiceItems(props);
    expect(invoiceItem.name).toEqual(props.name);
    expect(invoiceItem.price).toEqual(props.price);
  });

  it(`should throw erro if don't pass some required field`, () => {
    const props = {
      name: 'item 1',
      price: -1,
    };
    expect(() => new InvoiceItems(props)).toThrowError('Price is required and must be greater than 0');
  });
});