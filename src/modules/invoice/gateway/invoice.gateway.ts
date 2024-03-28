import { Invoice } from "../domain/invoice.entity"

export interface InvoiceGateway {
  generate(invoice: Invoice): Promise<void>
  find(id: string): Promise<Invoice>
}