//? Em caso de paginação, poderia ter um inputDTO
// export interface FindAllProductsInputDTO {}

export interface FindAllProductsOutputDTO {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}