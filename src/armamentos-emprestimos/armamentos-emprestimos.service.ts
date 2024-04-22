import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoEmprestimo as ArmamentoEmprestimoEnity } from './armamento-emprestimo.entity';
import { ArmamentoEmprestimo as ArmamentoEmprestimoInterface, ArmamentosEmprestimos as ArmamentosEmprestimosInterface } from './armamento-emprestimo.interface';

@Injectable()
export class ArmamentosEmprestimosService {
    constructor(
        @InjectRepository(ArmamentoEmprestimoEnity)
        private armamentoEmprestimoRepository: Repository<ArmamentoEmprestimoEnity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ArmamentosEmprestimosInterface> {
        return await this.armamentoEmprestimoRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoEmprestimoInterface | null> {
        return await this.armamentoEmprestimoRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoEmprestimoInterface, idUser: User) {
        var object:ArmamentoEmprestimoInterface = this.armamentoEmprestimoRepository.create({...object, data_emprestimo: new Date(), subunidade: idUser.subunidade, created_by: idUser}) 
        await this.armamentoEmprestimoRepository.save(object);      
      }
  
      async update(id:number, object: ArmamentoEmprestimoInterface, idUser: User) {
        var data: ArmamentoEmprestimoInterface = await this.armamentoEmprestimoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoEmprestimoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.armamentoEmprestimoRepository.delete(id);;
      }
}
