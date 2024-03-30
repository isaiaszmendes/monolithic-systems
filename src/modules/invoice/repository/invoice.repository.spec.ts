import { Sequelize } from "sequelize-typescript";
import { Id } from "../../@shared/domain/value-object/id.value-object";

import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceRepository } from "./invoice.repository";
import { Invoice } from "../domain/invoice.entity";
import { Address } from "../domain/value-object/address/address.value-object";
import { InvoiceItem } from "../domain/invoice-item.entity";

describe('Invoice Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		});

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

	afterEach(async () => {
		await sequelize.close();
	});

  it('should generate a invoice', async () => {
    const invoiceProps = {
      id: new Id("1"),
      name: 'John silva',
      document: '123456789',
    };

    const addressProps = {
      city: 'New York',
      complement: 'Near the park',
      number: '123',
      state: 'NY',
      street: 'Park Avenue',
      zipCode: '123456',
    };

    const itemProps = {
      id: new Id('12'),
      name: 'Product 1',
      price: 100,
    };

    const address = new Address(addressProps);
    const item = new InvoiceItem(itemProps);
    const invoiceInput = new Invoice({
      ...invoiceProps,
      address,
      items: [item],
    });

    const invoiceRepository = new InvoiceRepository();
    const result = await invoiceRepository.generate(invoiceInput);

    expect(result.id.id).toEqual(invoiceProps.id.id);
    expect(result.name).toEqual(invoiceProps.name);
    expect(result.document).toEqual(invoiceProps.document);
    expect(result.address.city).toEqual(addressProps.city);
    expect(result.address.complement).toEqual(addressProps.complement);
    expect(result.address.number).toEqual(addressProps.number);
    expect(result.address.state).toEqual(addressProps.state);
    expect(result.address.street).toEqual(addressProps.street);
    expect(result.address.zipCode).toEqual(addressProps.zipCode);
    expect(result.items).toEqual([item]);
  });

  it('should find a invoice by id', async () => {
    const invoiceProps = {
      id: new Id("1"),
      name: 'John silva',
      document: '123456789',
    };

    const addressProps = {
      city: 'New York',
      complement: 'Near the park',
      number: '123',
      state: 'NY',
      street: 'Park Avenue',
      zipCode: '123456',
    };

    const itemProps = {
      id: new Id('12'),
      name: 'Product 1',
      price: 100,
    };

    const address = new Address(addressProps);
    const item = new InvoiceItem(itemProps);
    const invoice = new Invoice({
      ...invoiceProps,
      address,
      items: [item],
    });

    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      city: invoice.address.city,
      complement: invoice.address.complement,
      number: invoice.address.number,
      state: invoice.address.state,
      street: invoice.address.street,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item: InvoiceItem) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [
        { model: InvoiceItemModel },
      ]
    });
    const invoiceRepository = new InvoiceRepository();
    const result = await invoiceRepository.find(invoice.id.id);

    expect(result.id.id).toEqual(invoiceProps.id.id);
    expect(result.name).toEqual(invoiceProps.name);
    expect(result.document).toEqual(invoiceProps.document);
    expect(result.address.city).toEqual(addressProps.city);
    expect(result.address.complement).toEqual(addressProps.complement);
    expect(result.address.number).toEqual(addressProps.number);
    expect(result.address.state).toEqual(addressProps.state);
    expect(result.address.street).toEqual(addressProps.street);
    expect(result.address.zipCode).toEqual(addressProps.zipCode);
    expect(result.items).toEqual([item]);
  });
});