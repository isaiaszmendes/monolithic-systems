import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { InvoiceItem } from "../../domain/invoice-item.entity";
import { Invoice } from "../../domain/invoice.entity";
import { Address } from "../../domain/value-object/address/address.value-object";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private readonly invoiceRepository: InvoiceGateway) {}
  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address({
      city: input.city,
      complement: input.complement,
      number: input.number,
      state: input.state,
      street: input.street,
      zipCode: input.zipCode,
    });
    const items = input.items.map(item => new InvoiceItem({
      id: new Id(item.id),
      name: item.name,
      price: item.price,
    }));
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address,
      items,
    });

    const output = await this.invoiceRepository.generate(invoice);

    return {      
      id: output.id.id,
      name: output.name,
      document: output.document,
      city: output.address.city,
      complement: output.address.complement,
      number: output.address.number,
      state: output.address.state,
      street: output.address.street,
      zipCode: output.address.zipCode,
      items: output.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: output.total,
    };
  }
}