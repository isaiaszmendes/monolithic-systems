import { Invoice } from "../invoice.entity"

export interface InvoiceGateway {
  generate(invoice: Invoice): Promise<Invoice>
  find(id: string): Promise<Invoice>
}