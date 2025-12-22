// product.model.ts
export interface ProductDb {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    
    createdAt: Date;
    updatedAt: Date;
}

export interface Product extends ProductDb {
  id: string;
}