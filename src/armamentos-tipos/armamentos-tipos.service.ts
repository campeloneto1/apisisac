import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArmamentoTipo as ArmamentoTipoEntity } from './armamento-tipo.entity';
import { ArmamentoTipo as ArmamentoTipoInterface, ArmamentosTipos as ArmamentosTiposInterface } from './armamento-tipo.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class ArmamentosTiposService {
    constructor(
        @InjectRepository(ArmamentoTipoEntity)
        private armamentoTipoRepository: Repository<ArmamentoTipoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ArmamentosTiposInterface> {
        return await this.armamentoTipoRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoTipoInterface | null> {
        return await this.armamentoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoTipoInterface, idUser: User) {
        var object:ArmamentoTipoInterface = this.armamentoTipoRepository.create({...object, created_by: idUser}) 
        await this.armamentoTipoRepository.save(object);      
      }
  
      async update(id:number, object: ArmamentoTipoInterface, idUser: User) {
        var data: ArmamentoTipoInterface = await this.armamentoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoTipoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.armamentoTipoRepository.delete(id);;
      }
}
