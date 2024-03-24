import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import { FindProductInputDTO, FindProductOutputDTO } from "./find-product.dto";

export class FindProductUseCase implements UseCaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
  }
}