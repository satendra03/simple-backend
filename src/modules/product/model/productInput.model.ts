export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export type UpdateProductInput = Partial<CreateProductInput>;
