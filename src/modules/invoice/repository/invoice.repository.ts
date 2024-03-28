import { InvoiceItem } from "../domain/invoice-item.entity";
import { Invoice } from "../domain/invoice.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
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
    } catch (error) {
      console.log(error)
    }
  }

  async find(id: string): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
}