import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDTO } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){
    }

    @Post()
    addProduct(@Body() payload: AddProductDTO, @UploadedFile() file: Express.Multer.File){
        if(!file) throw new BadRequestException('Photo is required.')
        return this.productService.createProduct(payload,file)
    }

    @Get()
    getProducts(){
        return this.productService.getProducts();
    }

    @Get('/:id')
    getProductById(@Param('id', new ParseUUIDPipe()) id: string){
        return this.productService.getProductById(id);
    }

    @Patch('/:id')
    updateProduct(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() payload: AddProductDTO, 
        @UploadedFile() file: Express.Multer.File){
            return this.productService.updateProductById(id,payload, file);
    }

    @Delete('id')
    deleteProduct(@Param('id', new ParseUUIDPipe())id: string){
        return this.productService.deleteProductById(id);
    }

}
