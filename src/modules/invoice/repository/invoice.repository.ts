import { Id } from "../../@shared/domain/value-object/id.value-object";
import { InvoiceItem } from "../domain/invoice-item.entity";
import { Invoice } from "../domain/invoice.entity";
import { Address } from "../domain/value-object/address/address.value-object";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<Invoice> {
    try {
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
      return invoice
    } catch (error) {
      console.log(error)
    }
  }

  async find(id: string): Promise<Invoice> {
    const invoiceDb = await InvoiceModel.findOne({
      where: { id },
      rejectOnEmpty: true,
      include: ['items']
    });

    return new Invoice({
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
  }
}