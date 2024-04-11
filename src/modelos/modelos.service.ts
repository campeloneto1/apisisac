import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modelo as ModeloEntity } from './modelo.entity';
import { Modelo as ModeloInterface, Modelos as ModelosInterface  } from './modelo.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class ModelosService {
    constructor(
        @InjectRepository(ModeloEntity)
        private modeloRepository: Repository<ModeloEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ModelosInterface> {
        return await this.modeloRepository.find();
      }
  
      async find(id: number): Promise<ModeloInterface | null> {
        return await this.modeloRepository.findOne({where: {id: id}});
      }
  
      async create(object: ModeloInterface, idUser: User) {
        var object:ModeloInterface = this.modeloRepository.create({...object, created_by: idUser}) 
        await this.modeloRepository.save(object);      
      }
  
      async update(id:number, object: ModeloInterface, idUser: User) {
        var data: ModeloInterface = await this.modeloRepository.findOneBy({id: id});
        data = {...object}
        await this.modeloRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.modeloRepository.delete(id);;
      }
}
