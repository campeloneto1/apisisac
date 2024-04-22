import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { IsNull, Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { Armamento as ArmamentoEntity } from './armamento.entity';
import { Armamento as ArmamentoInterface, Armamentos as ArmamentosInterface } from './armamento.interface';

@Injectable()
export class ArmamentosService {
    constructor(
        @InjectRepository(ArmamentoEntity)
        private armamentoRepository: Repository<ArmamentoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ArmamentosInterface> {
        return await this.armamentoRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoInterface | null> {
        return await this.armamentoRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoInterface, idUser: User) {
        var object:ArmamentoInterface = this.armamentoRepository.create({...object, subunidade: idUser.subunidade, created_by: idUser}) 
        await this.armamentoRepository.save(object);      
      }
  
      async update(id:number, object: ArmamentoInterface, idUser: User) {
        var data: ArmamentoInterface = await this.armamentoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.armamentoRepository.delete(id);;
      }

      async disponiveis(): Promise<ArmamentosInterface> {
        return await this.armamentoRepository.find({where: {
          data_baixa: IsNull(),
          
        }});
      }
}
