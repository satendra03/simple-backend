import { Product } from "../model/product.model.js";
import { ProductResponseDto } from "../dto/ProductResponse.dto.js";
import { CreateProductDto } from "../dto/CreateProduct.dto.js";
import { CreateProductInput } from "../model/ProductInput.type.js";

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
    return products.map(ProductMapper.toResponseDto);
  }

  // API → Domain
  static toCreateInput(dto: CreateProductDto): CreateProductInput {
    return {
      name: dto.name,
      price: dto.price,
      description: dto.description,
      category: dto.category,
      image: dto.image,
    };
  }
}
