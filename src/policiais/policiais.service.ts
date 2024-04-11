import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policial as PolicialEntity } from './policial.entity';
import { Policial as PolicialInterface, Policiais as PoliciaisInterface } from './policial.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class PoliciaisService {
    constructor(
        @InjectRepository(PolicialEntity)
        private policialRepository: Repository<PolicialEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PoliciaisInterface> {
        return await this.policialRepository.find();
      }
  
      async find(id: number): Promise<PolicialInterface | null> {
        return await this.policialRepository.findOne({where: {id: id}});
      }
  
      async create(object: PolicialInterface, idUser: User) {
        var object:PolicialInterface = this.policialRepository.create({...object, created_by: idUser}) 
        await this.policialRepository.save(object);      
      }
  
      async update(id:number, object: PolicialInterface, idUser: User) {
        var data: PolicialInterface = await this.policialRepository.findOneBy({id: id});
        data = {...object}
        await this.policialRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.policialRepository.delete(id);;
      }
}
