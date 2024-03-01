import { IS_STRING, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";



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
    @IsNumber()
    @IsPositive()
    price: number;

    photo: string
}