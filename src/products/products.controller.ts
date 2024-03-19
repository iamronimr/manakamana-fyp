import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDTO, UpdateProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {  filename } from 'file';


@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('photo', {
          storage: diskStorage({
            destination: 'static/products',
            filename,
          }),
        }),
      )
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
    @UseInterceptors(
        FileInterceptor('photo', {
          storage: diskStorage({
            destination: 'static/products',
            filename,
          }),
        }),
      )
    updateProduct(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() payload: UpdateProductDto, 
        @UploadedFile() file: Express.Multer.File){
            console.log(payload);
            return this.productService.updateProductById(id,payload, file);
    }

    @Delete('/:id')
    deleteProduct(@Param('id', new ParseUUIDPipe())id: string){
        return this.productService.deleteProductById(id);
    }

}
