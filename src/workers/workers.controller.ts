import { BadRequestException, Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { AddWorkerDTO, HireWorkerDto, UpdateWorkerDto } from './dto/worker.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {  filename } from 'file';
import { JwtAuthGuard } from 'src/@guards/jwt.guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/@decoraters/getRoles.decorater';
import { UserType } from 'src/user/entities/user.entity';
import { GetUser } from 'src/@decoraters/getUser.decorater';
@Controller('workers')
export class WorkersController {
    constructor(private readonly workerService: WorkersService){
    }

    @Post('registerworker')
    @UseInterceptors(
        FileInterceptor('photo', {
          storage: diskStorage({
            destination: 'static/workers',
            filename,
          }),
        }),
    )
    addWorker(@Body() payload: AddWorkerDTO, @UploadedFile() file: Express.Multer.File){
    if(!file) throw new BadRequestException('Photo is required.')
    console.log(payload)
    return this.workerService.createWorker(payload,file)
}

    @Get()
    getWorker(){
    return this.workerService.getWorkers()
}

    @Get('/:id')
    getWorkerById(@Param('id', new ParseUUIDPipe()) id: string){
    return this.workerService.getWorkerById(id);
}

    @Patch('/:id')
    @UseInterceptors(
        FileInterceptor('photo', {
          storage: diskStorage({
            destination: 'static/workers',
            filename,
          }),
        }),
      )

    updateWorker(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() payload: UpdateWorkerDto,
        @UploadedFile() file: Express.Multer.File){
            console.log(payload);
            return this.workerService.updateWorkerById(id, payload,file);
    }

    @Delete('/:id')
    deleteProduct(@Param('id', new ParseUUIDPipe())id: string){
        return this.workerService.deleteWorkerById(id);
    }

    @Post('/hire-worker')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles(UserType.CUSTOMER)
    hireWorker(@GetUser('id') customer_id: string, @Body() payload: HireWorkerDto){
      return this.workerService.hireWorker(payload,customer_id);
    }

}
