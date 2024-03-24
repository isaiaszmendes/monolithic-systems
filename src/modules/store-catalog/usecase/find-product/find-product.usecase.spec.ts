import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { FindProductUseCase } from "./find-product.usecase";

const product = {
  id: new Id('1'),
  name: 'Product 1',
  description: 'Product 1 description',
  salesPrice: 100,
}

const MockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(product)),
  findAll: jest.fn(),
})

describe('Find Product use case test', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository();

    const useCase = new FindProductUseCase(productRepository);

    const input = {
      id: '1',
    }
    const output = await useCase.execute(input);
    expect(productRepository.find).toBeCalledWith('1');
    expect(output.id).toEqual('1');
    expect(output.name).toEqual('Product 1');
    expect(output.description).toEqual('Product 1 description');
    expect(output.salesPrice).toEqual(100);
  });
});