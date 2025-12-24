import { Product } from "../model/product.model.js";
import { CreateProductInput, UpdateProductInput } from "../model/productInput.model.js";
import { ProductResponseDto } from "../dto/productResponse.dto.js";
import { CreateProductDto } from "../dto/createProduct.dto.js";
import { UpdateProductDto } from "../dto/updateProduct.dto.js";

export class ProductMapper {
  // Domain → API
  static toResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    };
  }

  static toResponseDtoList(products: Product[]): ProductResponseDto[] {
    return products.map((product) => this.toResponseDto(product));
  }

  // API → Domain
  static toCreateInput(product: CreateProductDto): CreateProductInput {
    return {
      name: product.name,
      price: product.price,
      description: product.description || "",
      category: product.category,
      image: product.image || "",
    };
  }
  static toUpdateInput(updates: UpdateProductDto): UpdateProductInput {
    const productInput: UpdateProductInput = {};

    if (updates.name !== undefined) productInput.name = updates.name;
    if (updates.price !== undefined) productInput.price = updates.price;
    if (updates.description !== undefined) productInput.description = updates.description;
    if (updates.category !== undefined) productInput.category = updates.category;
    if (updates.image !== undefined) productInput.image = updates.image;

    return productInput;
  }
}
