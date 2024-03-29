import { IS_STRING, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";



export class AddProductDTO{
    @IsString()
    @IsNotEmpty()
    productname: string;
    
    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    photo: string
}

export class UpdateProductDto{
    @IsString()
    @IsOptional()
    productname_edit: string;
    
    @IsString()
    @IsOptional()
    category_edit: string;

    @IsOptional()
    @IsString()
    description_edit: string;

    @IsOptional()
    @IsString()
    price_edit: string;

    photo: string;
}