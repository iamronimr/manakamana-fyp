import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AddProductDTO } from './dto/product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

    constructor(private readonly dataSource: DataSource){}

    async createProduct(payload: AddProductDTO, file: Express.Multer.File){
        const newProduct= payload;
        newProduct.photo= file.filename;

        const product= await this.dataSource.getRepository(Product).save(payload);
        return {product, message: 'Product Added Successfully.'};
    }

    async getProducts(){
        const products= await this.dataSource.getRepository(Product).find();
        if(!products) throw new BadRequestException('Products are empty');
        return products;
    }

    async getProductById(id: string){
        const product= await this.dataSource.getRepository(Product).findOne({where: {id: id}});
        if(!product) throw new NotFoundException('No product of this id');
        return product;
    }

    async updateProductById(id:string,payload: AddProductDTO, file: Express.Multer.File){
        const product= await this.getProductById(id);
        product.productname= payload.productname;
        product.category= payload.category;
        product.description= payload.description;
        product.price= payload.price;
        product.photo= file.filename;

        const updatedProduct= await this.dataSource.getRepository(Product).save(product);
        return {message: 'Product Updated Successfully.', updatedProduct};
    }

    async deleteProductById(id: string){
        const product= await this.getProductById(id);
        const deletedProduct= await this.dataSource.getRepository(Product).remove(product);
        return {message: 'Product Deleted Successfully', deletedProduct};
    }
}
