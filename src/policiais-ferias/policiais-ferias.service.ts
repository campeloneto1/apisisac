import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PolicialFerias as PolicialFeriasEntity } from './policial-ferias.entity';
import { PolicialFerias as PolicialFeriasInterface, PoliciaisFerias as PoliciaisFeriasInterface } from './policial-ferias.interface';
import { User } from 'src/users/user.interface';


@Injectable()
export class PoliciaisFeriasService {
    constructor(
        @InjectRepository(PolicialFeriasEntity)
        private policialFeriasRepository: Repository<PolicialFeriasEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PoliciaisFeriasInterface> {
        return await this.policialFeriasRepository.find();
      }
  
      async find(id: number): Promise<PolicialFeriasInterface | null> {
        return await this.policialFeriasRepository.findOne({where: {id: id}});
      }
  
      async create(object: PolicialFeriasInterface, idUser: User) {
        var object:PolicialFeriasInterface = this.policialFeriasRepository.create({...object, created_by: idUser}) 
        await this.policialFeriasRepository.save(object);      
      }
  
      async update(id:number, object: PolicialFeriasInterface, idUser: User) {
        var data: PolicialFeriasInterface = await this.policialFeriasRepository.findOneBy({id: id});
        data = {...object}
        await this.policialFeriasRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.policialFeriasRepository.delete(id);;
      }
}
