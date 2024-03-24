import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { CheckStockFacadeOutputDTO } from "../../facade/product-adm.facade.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import { CheckStockInputDTO } from "./check-stock.dto";

export class CheckStockUseCase implements UseCaseInterface  {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(input: CheckStockInputDTO): Promise<CheckStockFacadeOutputDTO> {
    const product = await this.productRepository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock,
    };
  }
}