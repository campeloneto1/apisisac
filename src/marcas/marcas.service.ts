import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca as MarcaEntity } from './marca.entity';
import { Marca as MarcaInterface, Marcas as MarcasInterface } from './marca.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class MarcasService {
    constructor(
        @InjectRepository(MarcaEntity)
        private paisRepository: Repository<MarcaEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<MarcasInterface> {
        return await this.paisRepository.find();
      }
  
      async find(id: number): Promise<MarcaInterface | null> {
        return await this.paisRepository.findOne({where: {id: id}});
      }
  
      async create(object: MarcaInterface, idUser: User) {
        var object:MarcaInterface = this.paisRepository.create({...object, created_by: idUser}) 
        await this.paisRepository.save(object);      
      }
  
      async update(id:number, object: MarcaInterface, idUser: User) {
        var data: MarcaInterface = await this.paisRepository.findOneBy({id: id});
        data = {...object}
        await this.paisRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.paisRepository.delete(id);;
      }
}
