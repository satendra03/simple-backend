import { Product } from "../model/product.model.js";
import { ProductResponseDto } from "../dto/ProductResponse.dto.js";
import { CreateProductDto } from "../dto/CreateProduct.dto.js";
import { CreateProductInput, UpdateProductInput } from "../model/ProductInput.type.js";
import { BadRequestError } from "../../../shared/ApiError.js";
import { UpdateProductDto } from "../dto/UpdateProduct.dto.js";

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
    if (!dto) throw new BadRequestError("Invalid input");
    if (!dto.name) throw new BadRequestError("Product name is required");
    if (!dto.price || dto.price < 0) throw new BadRequestError("Product price must be a positive number");
    if (!dto.category) throw new BadRequestError("Product category is required");

    if(dto.price !== undefined){
      const price = Number(dto.price);
      if (isNaN(price)) throw new BadRequestError("Product price must be a number");
      dto.price = price;
    }

    return {
      name: dto.name,
      price: dto.price,
      description: dto.description || "",
      category: dto.category,
      image: dto.image || "",
    };
  }
  static toUpdateInput(dto: UpdateProductDto): UpdateProductInput {
    if (!dto) throw new BadRequestError("Invalid input");

    let updates: UpdateProductInput = { ...dto };
    if(dto.price !== undefined){
      const price = Number(dto.price);
      if (isNaN(price)) throw new BadRequestError("Product price must be a number");
      updates.price = price;
    }

    return updates;
  }
}
