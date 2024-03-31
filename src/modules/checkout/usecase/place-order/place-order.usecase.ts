import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from "./place-order.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;
  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
  }

  async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    const client = await this._clientFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error('Client not found');
    }

    await this.validateProducts(input);

    //* validar produto // funcao a parte
    //* recuperar os produtos

    //* criar o objeto do client
    //* criar o objeto da order (client, products)

    //* process payment -> paymentFacade.process(orderId, amount)

    //* caso o pagamento seja aprovado -> Gerar invoce
    //* Mudar status da order para "approved"

    //* retornar DTO


    return {
      id: '1',
      invoiceId: '1',
      status: 'pending',
      total: 0,
      products: [],
    }
  }

  private async validateProducts(input: PlaceOrderInputDTO): Promise<void> {
    if (!input.products.length) {
      throw new Error('No products selected');
    }

    for (const p of input.products) {
      const product = await this._productFacade.checkStock({ productId: p.productId });
      if(product.stock <= 0) {
        throw new Error(`Product ${product.productId} is not available in stock`);
      }
    }
  }
}