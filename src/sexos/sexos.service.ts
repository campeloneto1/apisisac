import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sexo as SexoEntity } from './sexo.entity';
import { Sexo as SexoInterface, Sexos as SexosInterface } from './sexo.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class SexosService {
    constructor(
        @InjectRepository(SexoEntity)
        private sexoRepository: Repository<SexoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<SexosInterface> {
        return await this.sexoRepository.find();
      }
  
      async find(id: number): Promise<SexoInterface | null> {
        return await this.sexoRepository.findOne({where: {id: id}});
      }
  
      async create(object: SexoInterface, idUser: User) {
        var object:SexoInterface = this.sexoRepository.create({...object, created_by: idUser}) 
        await this.sexoRepository.save(object);      
      }
  
      async update(id:number, object: SexoInterface, idUser: User) {
        var data: SexoInterface = await this.sexoRepository.findOneBy({id: id});
        data = {...object}
        await this.sexoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.sexoRepository.delete(id);;
      }
}
