import { IS_STRING, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";


export class AddWorkerDTO{

    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    contact: string;

    photo: string;

    @IsString()
    @IsNotEmpty()
    servicetype: string;
}

export class UpdateWorkerDto{
    @IsString()
    @IsOptional()
    fullname_edit: string;
    
    @IsString()
    @IsOptional()
    address_edit: string;

    @IsOptional()
    @IsString()
    description_edit: string;

    @IsOptional()
    @IsString()
    contact_edit: string;

    @IsOptional()
    @IsString()
    servicetype_edit: string;

    photo: string;
}
export class HireWorkerDto{
    @IsString()
    @IsNotEmpty()
    worker_id: string;
}