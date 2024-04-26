import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Cor as CorEntity } from './cor.entity';
import { Cor as CorInterface, Cores as CoresInterface } from './cor.interface';

@Injectable()
export class CoresService {
    constructor(
        @InjectRepository(CorEntity)
        private corRepository: Repository<CorEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<CoresInterface> {
        return await this.corRepository.find();
      }
  
      async find(id: number): Promise<CorInterface | null> {
        return await this.corRepository.findOne({where: {id: id}});
      }
  
      async create(object: CorInterface, idUser: User) {
        var object:CorInterface = this.corRepository.create({...object, created_by: idUser}) 
        await this.corRepository.save(object);      
      }
  
      async update(id:number, object: CorInterface, idUser: User) {
        var data: CorInterface = await this.corRepository.findOneBy({id: id});
        data = {...object}
        await this.corRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.corRepository.delete(id);;
      }
}
