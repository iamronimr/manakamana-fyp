import { IsInt, IsOptional, IsUUID } from 'class-validator';

export class AddItemToCartDto {
  @IsUUID()
  product_id: string;
}