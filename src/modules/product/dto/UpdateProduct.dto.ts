import { CreateProductDto } from "./createProduct.dto.js";
export interface UpdateProductDto extends Partial<CreateProductDto> {}