import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { PlaceOrderUseCaseInputDTO } from "./place-order.usecase.dto";
import { PlaceOrderUseCase } from "./place-order.usecase";

const mockDate = new Date(2000,1,1);
describe('PlaceOrder Use Case Unit Test', () => {

  describe('validateProducts method', () => {
    // @ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase();

    it('should throw an error if no products are selected', async () => {
      const input: PlaceOrderUseCaseInputDTO = { clientId: '0', products: [] };
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
        new Error('No products selected'),
      );
    });

    it('should not throw an error when product is out of stock', async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: { productId: string } ) => (
          Promise.resolve({
            productId,
            stock: productId === '1' ? 0 : 1,
          })),
        ),
      }

      // @ts-expect-error - force set productFacade
      placeOrderUseCase['_productFacade'] = mockProductFacade;

      let input: PlaceOrderUseCaseInputDTO = { clientId: '0', products: [{ productId: '1' }] };

      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
        new Error('Product 1 is not available in stock'),
      );

      input = { clientId: '0', products: [{ productId: '0' }, { productId: '1' }] };
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
        new Error('Product 1 is not available in stock'),
      );
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

      input = { 
        clientId: '0', 
        products: [ { productId: '0' }, { productId: '1' }, { productId: '2' }, { productId: '3' }]
      };
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
        new Error('Product 1 is not available in stock'),
      );
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5); 
      // 5 pois depois que recebe um throw ele sai do loop
    });
  });

  describe('getProduct method', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(mockDate)
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    // @ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase();

    it('should throw an error when product not found', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      // @ts-expect-error - force set catalogFacade
      placeOrderUseCase['_catalogFacade'] = mockCatalogFacade;

      await expect(placeOrderUseCase['getProduct']('0')).rejects.toThrow(
        new Error('Product not found')
      );
    });

    it('should find a product', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: '0',
          name: 'Product 0',
          description: 'Product 0 description',
          salesPrice: 0
        }),
      };

      // @ts-expect-error - force set catalogFacade
      placeOrderUseCase['_catalogFacade'] = mockCatalogFacade;

      await expect(placeOrderUseCase['getProduct']('0')).resolves.toEqual(
        new Product({
          id: new Id('0'),
          name: 'Product 0',
          description: 'Product 0 description',
          salesPrice: 0
        })
      );

      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('execute method', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(mockDate)
    });

    afterAll(() => {
      jest.useRealTimers();
    });
    it('should throw an error if client is not found', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };
      
      // @ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();
      
      // @ts-expect-error - force set clientFacade
      placeOrderUseCase['_clientFacade'] = mockClientFacade;

      const input: PlaceOrderUseCaseInputDTO = { clientId: '0', products: [] };

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error('Client not found'),
      );
    });

    it('should throw an error when products are not valid', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      };
      
      // @ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();
      
      const mockValidateProducts = jest
        // @ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, 'validateProducts')
        // @ts-expect-error - not return never
        .mockRejectedValue(new Error('No products selected'));
      
      // @ts-expect-error - force set clientFacade
      placeOrderUseCase['_clientFacade'] = mockClientFacade;

      const input: PlaceOrderUseCaseInputDTO = { clientId: '1', products: [] };
      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error('No products selected'),
      );

      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });

    describe('place an order', () => {

      const clientProps = {
        id: '7f',
        name: 'Client 0',
        document: '000.000.000-00',
        email: 'client@email.com',
        street: 'Client street',
        number: '0',
        complement: 'house yellow',
        city: 'Client city',
        state: 'Client state',
        zipCode: '00000-000',
      };

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(clientProps),
        add: jest.fn(),
      };

      const mockPaymentFacade = {
        process: jest.fn(),
      };

      const mockCheckoutRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn(),
      };

      const mockInvoiceFacade = {
        generate: jest.fn().mockResolvedValue({ id: '1i' }),
        find: jest.fn(),
      };

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade,
        null,
        null,
        mockCheckoutRepository,
        mockInvoiceFacade,
        mockPaymentFacade,
      );

      const products = {
        "1": new Product({
          id: new Id('1'),
          name: 'Product 1',
          description: 'Product 1 description',
          salesPrice: 40
        }),
        "2": new Product({
          id: new Id('2'),
          name: 'Product 2',
          description: 'Product 2 description',
          salesPrice: 30
        }),        
      };

      const mockValidateProducts = jest
      // @ts-expect-error - spy on private method
      .spyOn(placeOrderUseCase, 'validateProducts')
      // @ts-expect-error - not return never
      .mockResolvedValue(null);

      const mockGetProduct = jest
      // @ts-expect-error - spy on private method
      .spyOn(placeOrderUseCase, 'getProduct')
      // @ts-expect-error - not return never
      .mockImplementation((productId: keyof typeof products) => {
        return products[productId];
      });

      it('should not be approved', async () => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          transactionId: '1t',
          orderId: 'io',
          amount: 100,
          status: 'error',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const input: PlaceOrderUseCaseInputDTO  = {
          clientId: '1c',
          products: [{ productId: '1' }, { productId: '2' }],
        };

        const output = await placeOrderUseCase.execute(input);

        expect(output.invoiceId).toBe(null);
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([
          { productId: '1' },
          { productId: '2' },
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });

        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0);
      });

      it('should be approved', async () => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          transactionId: '2t',
          orderId: 'io',
          amount: 100,
          status: 'approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const input: PlaceOrderUseCaseInputDTO  = {
          clientId: '1c',
          products: [{ productId: '1' }, { productId: '2' }],
        };

        const output = await placeOrderUseCase.execute(input);

        expect(output.invoiceId).toBe('1i');
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([
          { productId: '1' },
          { productId: '2' },
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });

        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
          name: clientProps.name,
          document: clientProps.document,
          street: clientProps.street,
          number: clientProps.number,
          complement: clientProps.complement,
          city: clientProps.city,
          state: clientProps.state,
          zipCode: clientProps.zipCode,
          items: [
            {
              id: products['1'].id.id,
              name: products['1'].name,
              price: products['1'].salesPrice,
            },
            {
              id: products['2'].id.id,
              name: products['2'].name,
              price: products['2'].salesPrice,
            }
          ]

        });
      });
    });
  });
});