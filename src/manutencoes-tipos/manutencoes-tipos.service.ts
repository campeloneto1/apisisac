import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ManutencaoTipo as ManutencaoTipoEntity } from './manutencao-tipo.entity';
import { ManutencaoTipo as ManutencaoTipoInterface, ManutencoesTipos as ManutencoesTiposInterface } from './manutencao-tipo.interface';

@Injectable()
export class ManutencoesTiposService {
    constructor(
        @InjectRepository(ManutencaoTipoEntity)
        private manutencaoTipoRepository: Repository<ManutencaoTipoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ManutencoesTiposInterface> {
        return await this.manutencaoTipoRepository.find();
      }
  
      async find(id: number): Promise<ManutencaoTipoInterface | null> {
        return await this.manutencaoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: ManutencaoTipoInterface, idUser: User) {
        var object:ManutencaoTipoInterface = this.manutencaoTipoRepository.create({...object, created_by: idUser}) 
        await this.manutencaoTipoRepository.save(object);      
      }
  
      async update(id:number, object: ManutencaoTipoInterface, idUser: User) {
        var data: ManutencaoTipoInterface = await this.manutencaoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.manutencaoTipoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.manutencaoTipoRepository.delete(id);;
      }
}
