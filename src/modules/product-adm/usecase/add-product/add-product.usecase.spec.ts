const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe('Add Product useCase unit test', () => { 
  it('should add a product', () => {
    // repositorio
    // usecase
    const productRepository = MockRepository()
    const useCase = new AddProductUseCase(productRepository)

    const input = {
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
    }

    useCase.execute(input)
    // input
    // output
  })
})