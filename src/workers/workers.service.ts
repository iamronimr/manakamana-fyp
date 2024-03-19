import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AddWorkerDTO, UpdateWorkerDto } from './dto/worker.dto';
import {Worker} from './entities/worker.entity'

@Injectable()
export class WorkersService {

    constructor(private readonly datasource: DataSource){}

    async createWorker(payload: AddWorkerDTO, file: Express.Multer.File){
        const newWorker= payload;
        newWorker.photo= file.filename;

        const worker= await this.datasource.getRepository(Worker).save(payload);
        return {worker, message: 'Worker Added successfully'};
    }

    async getWorkers(){
        const worker= await this.datasource.getRepository(Worker).find();
        if(!worker) throw new BadRequestException('Workers are empty!')
        return worker;
    }

    async getWorkerById(id:string){
        const worker= await this.datasource.getRepository(Worker).findOne({where: {id:id}});
        if(!worker) throw new NotFoundException('No Worker of this id');
        return worker;
    }

    async updateWorkerById(id:string,payload: UpdateWorkerDto, file: Express.Multer.File){
        const worker= await this.getWorkerById(id);
        worker.fullname= payload.fullname_edit;
        worker.servicetype= payload.servicetype_edit;
        worker.address= payload.address_edit;
        worker.description= payload.description_edit;
        worker.contact= payload.contact_edit;
        if(file){
            worker.photo= file.filename;
        }

        const updateWorker= await this.datasource.getRepository(Worker).save(worker);
        console.log(updateWorker);
        return{message: 'Worker updateed Successfully.' , updateWorker};
    }

    async deleteWorkerById(id:string){
        const worker= await this.getWorkerById(id);
        const deletedWorker= await this.datasource.getRepository(Worker).remove(worker);
        return {message: 'Worker Deleted Successfully', deletedWorker};
    }
}
