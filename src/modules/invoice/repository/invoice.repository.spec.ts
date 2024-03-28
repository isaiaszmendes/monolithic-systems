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

  it('should create a invoice', async () => {
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
    await invoiceRepository.generate(invoiceInput);

    const invoiceDb = await InvoiceModel.findOne({
        where: { id: invoiceProps.id.id },
        rejectOnEmpty: true,
        include: ['items']
      });

    const invoice = new Invoice({
      id: new Id(invoiceDb.id),
      name: invoiceDb.name,
      document: invoiceDb.document,
      address: new Address({
        city: invoiceDb.city,
        complement: invoiceDb.complement,
        number: invoiceDb.number,
        state: invoiceDb.state,
        street: invoiceDb.street,
        zipCode: invoiceDb.zipCode,
      }),
      items: invoiceDb.items.map((item) => new InvoiceItem({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    });

    expect(invoice.id.id).toEqual(invoiceProps.id.id);
    expect(invoice.name).toEqual(invoiceProps.name);
    expect(invoice.document).toEqual(invoiceProps.document);
    expect(invoice.address.city).toEqual(addressProps.city);
    expect(invoice.address.complement).toEqual(addressProps.complement);
    expect(invoice.address.number).toEqual(addressProps.number);
    expect(invoice.address.state).toEqual(addressProps.state);
    expect(invoice.address.street).toEqual(addressProps.street);
    expect(invoice.address.zipCode).toEqual(addressProps.zipCode);
    expect(invoice.items).toEqual([item]);
  });
});