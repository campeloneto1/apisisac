import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { PatrimonioTipo as PatrimonioTipoEntity } from './patrimonio-tipo.entity';
import { PatrimonioTipo as PatrimonioTipoInterface, PatrimoniosTipos as PatrimoniosTiposInterface } from './patrimonio-tipo.interface';

@Injectable()
export class PatrimoniosTiposService {
    constructor(
        @InjectRepository(PatrimonioTipoEntity)
        private manutencaoTipoRepository: Repository<PatrimonioTipoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<PatrimoniosTiposInterface> {
        return await this.manutencaoTipoRepository.find();
      }
  
      async find(id: number): Promise<PatrimonioTipoInterface | null> {
        return await this.manutencaoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: PatrimonioTipoInterface, idUser: User) {
        var object:PatrimonioTipoInterface = this.manutencaoTipoRepository.create({...object, created_by: idUser}) 
        await this.manutencaoTipoRepository.save(object);      
      }
  
      async update(id:number, object: PatrimonioTipoInterface, idUser: User) {
        var data: PatrimonioTipoInterface = await this.manutencaoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.manutencaoTipoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.manutencaoTipoRepository.delete(id);;
      }
}
