import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import { FindAllProductsOutputDTO } from "./find-all-products.dto";

export class FindAllProductsUseCase implements UseCaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(): Promise<FindAllProductsOutputDTO> {
    const products = await this.productRepository.findAll();
    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      }))
    }
  }
}

