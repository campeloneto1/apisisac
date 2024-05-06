import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Log as LogEntity } from './log.entity';
import { Log as LogInterface, Logs as LogsInterface } from './log.interface';

@Injectable()
export class LogsService {
    constructor(
        @InjectRepository(LogEntity)
        private logRepository: Repository<LogEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<LogsInterface> {
        return await this.logRepository.find();
      }
  
      async find(id: number): Promise<LogInterface | null> {
        return await this.logRepository.findOne({where: {id: id}});
      }
  
      async create(object: LogInterface) {
        var object:LogInterface = this.logRepository.create({...object}) 
        await this.logRepository.save(object);      
      }
  
      async update(id:number, object: LogInterface) {
        var data: LogInterface = await this.logRepository.findOneBy({id: id});
        data = {...object}
        await this.logRepository.update({id:id},{...data});
      }
  
      async remove(id: number) {
        return await this.logRepository.delete(id);;
      }
}
