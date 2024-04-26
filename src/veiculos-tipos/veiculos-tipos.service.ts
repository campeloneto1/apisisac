import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { VeiculoTipo as VeiculoTipoEntity } from './veiculo-tipo.entity';
import { VeiculoTipo as VeiculoTipoInterface, VeiculosTipos as VeiculosTiposInterface } from './veiculo-tipo.interface';

@Injectable()
export class VeiculosTiposService {
    constructor(
        @InjectRepository(VeiculoTipoEntity)
        private veiculoTipoRepository: Repository<VeiculoTipoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<VeiculosTiposInterface> {
        return await this.veiculoTipoRepository.find();
      }
  
      async find(id: number): Promise<VeiculoTipoInterface | null> {
        return await this.veiculoTipoRepository.findOne({where: {id: id}});
      }
  
      async create(object: VeiculoTipoInterface, idUser: User) {
        var object:VeiculoTipoInterface = this.veiculoTipoRepository.create({...object, created_by: idUser}) 
        await this.veiculoTipoRepository.save(object);      
      }
  
      async update(id:number, object: VeiculoTipoInterface, idUser: User) {
        var data: VeiculoTipoInterface = await this.veiculoTipoRepository.findOneBy({id: id});
        data = {...object}
        await this.veiculoTipoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.veiculoTipoRepository.delete(id);;
      }
}
