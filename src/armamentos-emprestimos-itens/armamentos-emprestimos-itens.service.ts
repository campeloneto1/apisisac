import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoEmprestimoItem as ArmamentoEsmprestimoItemEntity } from './armamento-emprestimo-item.entity';
import { ArmamentoEmprestimoItem as  ArmamentoEsmprestimoItemInterface, ArmamentosEmprestimosItens as ArmamentosEmprestimosItensInterface} from './armamento-emprestimo-item.interface';

@Injectable()
export class ArmamentosEmprestimosItensService {
    constructor(
        @InjectRepository(ArmamentoEsmprestimoItemEntity)
        private armamentoEmprestimoItemRepository: Repository<ArmamentoEsmprestimoItemEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ArmamentosEmprestimosItensInterface> {
        return await this.armamentoEmprestimoItemRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoEsmprestimoItemInterface | null> {
        return await this.armamentoEmprestimoItemRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoEsmprestimoItemInterface, idUser: User) {
        var object:ArmamentoEsmprestimoItemInterface = this.armamentoEmprestimoItemRepository.create({...object, created_by: idUser}) 
        await this.armamentoEmprestimoItemRepository.save(object);      
      }
  
      async update(id:number, object: ArmamentoEsmprestimoItemInterface, idUser: User) {
        var data: ArmamentoEsmprestimoItemInterface = await this.armamentoEmprestimoItemRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoEmprestimoItemRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.armamentoEmprestimoItemRepository.delete(id);;
      }
}
