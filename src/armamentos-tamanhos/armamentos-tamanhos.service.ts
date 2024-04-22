import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoTamanho as ArmamentoTamanhoEntity } from './armamento-tamanho.entity';
import { ArmamentoTamanho as ArmamentoTamanhoInterface, ArmamentosTamanhos as ArmamentosTamanhosInterface } from './armamento-tamanho.interface';

@Injectable()
export class ArmamentosTamanhosService {
    constructor(
        @InjectRepository(ArmamentoTamanhoEntity)
        private armamentoTipoRepository: Repository<ArmamentoTamanhoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ArmamentosTamanhosInterface> {
        return await this.armamentoTipoRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoTamanhoInterface | null> {
        return await this.armamentoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoTamanhoInterface, idUser: User) {
        var object:ArmamentoTamanhoInterface = this.armamentoTipoRepository.create({...object, created_by: idUser}) 
        await this.armamentoTipoRepository.save(object);      
      }
  
      async update(id:number, object: ArmamentoTamanhoInterface, idUser: User) {
        var data: ArmamentoTamanhoInterface = await this.armamentoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoTipoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.armamentoTipoRepository.delete(id);;
      }
}
