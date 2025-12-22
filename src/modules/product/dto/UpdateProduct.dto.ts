import { CreateProductDto } from "./CreateProduct.dto.js";
export interface UpdateProductDto extends Partial<CreateProductDto> {}