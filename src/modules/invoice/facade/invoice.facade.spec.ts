import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import { InvoiceRepository } from "../repository/invoice.repository";
import { GenerateInvoiceUseCase } from "../usecase/generate-invoice/generate-invoice.usecase";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Address } from "../domain/value-object/address/address.value-object";
import { InvoiceItem } from "../domain/invoice-item.entity";
import { Invoice } from "../domain/invoice.entity";
import { InvoiceFacade } from "./invoice.facade";
import { FindInvoiceUseCase } from "../usecase/find-invoice/find-invoice.usecase";

describe('InvoiceFacade Test', () => {
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

  it('should generate a invoice using facade', async () => {
    const repository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);

    const invoiceFacade = new InvoiceFacade({
      generateUseCase: generateInvoiceUseCase,
      findUseCase: undefined,
    });

    const input = {
      name: 'John silva',
      document: '123456789',
      city: 'New York',
      complement: 'Near the park',
      number: '123',
      state: 'NY',
      street: 'Park Avenue',
      zipCode: '123456',
      items: [{
        id: new Id('12'),
        name: 'Product 1',
        price: 100,
      }],
    };

    const result = await invoiceFacade.generate({
      name: input.name,
      document: input.document,
      city: input.city,
      complement: input.complement,
      number: input.number,
      state: input.state,
      street: input.street,
      zipCode: input.zipCode,
      items: input.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
    });
    
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.city).toEqual(input.city);
    expect(result.complement).toEqual(input.complement);
    expect(result.number).toEqual(input.number);
    expect(result.state).toEqual(input.state);
    expect(result.street).toEqual(input.street);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items.length).toEqual(1);
    expect(result.items[0].id).toEqual(input.items[0].id.id);
    expect(result.items[0].name).toEqual(input.items[0].name);
    expect(result.items[0].price).toEqual(input.items[0].price);
  });

  it('should find a invoice by id using facade', async () => {
    const invoice = new Invoice({
      id: new Id('1'),
      name: 'Sarah Souza',
      document: '984562384',
      address: new Address({
        city: 'Ferraz de Vasconcelos',
        complement: 'Ap 36',
        number: '87',
        state: 'SP',
        street: 'Rua Bela Vista',
        zipCode: '123456',
      }),
      items: [
        new InvoiceItem({
          id: new Id('12'),
          name: 'Product 1',
          price: 100,
        }),
        new InvoiceItem({
          id: new Id('13'),
          name: 'Product 2',
          price: 200,
        }),
      ],
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

    const repository = new InvoiceRepository();
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);

    const invoiceFacade = new InvoiceFacade({
      generateUseCase: undefined,
      findUseCase: findInvoiceUseCase,
    });

    const result = await invoiceFacade.find({ id: invoice.id.id });

    expect(result.id).toEqual(invoice.id.id);
    expect(result.name).toEqual(invoice.name);
    expect(result.document).toEqual(invoice.document);
    expect(result.address.city).toEqual(invoice.address.city);
    expect(result.address.complement).toEqual(invoice.address.complement);
    expect(result.address.number).toEqual(invoice.address.number);
    expect(result.address.state).toEqual(invoice.address.state);
    expect(result.address.street).toEqual(invoice.address.street);
    expect(result.address.zipCode).toEqual(invoice.address.zipCode);
    expect(result.items.length).toEqual(2);
    expect(result.items[0].id).toEqual(invoice.items[0].id.id);
    expect(result.items[0].name).toEqual(invoice.items[0].name);
    expect(result.items[0].price).toEqual(invoice.items[0].price);
    expect(result.total).toEqual(300);
  });
});

