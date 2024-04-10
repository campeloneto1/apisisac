import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais as PaisEntity } from './paises.entity';
import { Pais as PaisInterface, Paises as PaisesInterface } from './paises.interface';
import { Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';

@Injectable()
export class PaisesService {
    constructor(
        @InjectRepository(PaisEntity)
        private paisRepository: Repository<PaisEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PaisesInterface> {
        return await this.paisRepository.find();
      }
  
      async find(id: number): Promise<PaisInterface | null> {
        return await this.paisRepository.findOne({where: {id: id}});
      }
  
      async create(object: PaisInterface, idUser: User) {
        var object:PaisInterface = this.paisRepository.create({...object, created_by: idUser}) 
        await this.paisRepository.save(object);      
      }
  
      async update(id:number, object: PaisInterface, idUser: User) {
        var data: PaisInterface = await this.paisRepository.findOneBy({id: id});
        data = {...object}
        await this.paisRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.paisRepository.delete(id);;
      }
}
