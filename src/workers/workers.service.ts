import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AddWorkerDTO, HireWorkerDto, UpdateWorkerDto } from './dto/worker.dto';
import {Worker} from './entities/worker.entity'
import { User } from 'src/user/entities/user.entity';
import { sendMail } from 'src/@utils/mail';
import { hireWorkerTemplate } from 'src/@utils/mail-template';

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

    async hireWorker(payload: HireWorkerDto, customer_id: string){
        const worker = await this.getWorkerById(payload.worker_id);
        const customer = await this.datasource.getRepository(User).findOne({where: {id: customer_id}});
        console.log(customer);
        console.log(worker);

        const email={
            workerName: worker.fullname,
            service: worker.servicetype,
            workeraddress: worker.address,
            workercontact: worker.contact,
            hireby: customer.username,
            customer_email: customer.email
        }
        // send email to admin
        sendMail({
            to: 'manakamanaonline1@gmail.com',
            subject: 'Request for Hiring Your Worker!!.',
            html: hireWorkerTemplate(email),
        })
    }
}
