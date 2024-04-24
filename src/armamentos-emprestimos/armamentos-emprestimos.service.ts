import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoEmprestimo as ArmamentoEmprestimoEnity } from './armamento-emprestimo.entity';
import { ArmamentoEmprestimo as ArmamentoEmprestimoInterface, ArmamentosEmprestimos as ArmamentosEmprestimosInterface } from './armamento-emprestimo.interface';
import { ArmamentosEmprestimosItensService } from 'src/armamentos-emprestimos-itens/armamentos-emprestimos-itens.service';
import { ArmamentosService } from 'src/armamentos/armamentos.service';

@Injectable()
export class ArmamentosEmprestimosService {
    constructor(
        @InjectRepository(ArmamentoEmprestimoEnity)
        private armamentoEmprestimoRepository: Repository<ArmamentoEmprestimoEnity>,
        private lazyModuleLoader: LazyModuleLoader,
        private armamentosEmprestimosItensService: ArmamentosEmprestimosItensService,
        private armamentoService: ArmamentosService,
    ){}

    async index(): Promise<ArmamentosEmprestimosInterface> {
        return await this.armamentoEmprestimoRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoEmprestimoInterface | null> {
        return await this.armamentoEmprestimoRepository.findOne({
          where: {id: id} ,
          relations: {
            armamentos_emprestimos_itens: {
              armamento: true,
              armamento_emprestimo: false
            }
          }
        });
      }
  
      async create(object: ArmamentoEmprestimoInterface, idUser: User) {
        var object2:ArmamentoEmprestimoInterface = this.armamentoEmprestimoRepository.create({...object, data_emprestimo: new Date(), subunidade: idUser.subunidade, created_by: idUser}) 
        let emp = await this.armamentoEmprestimoRepository.save(object2);  
       
         object.armamentos.forEach(element => {
            this.armamentosEmprestimosItensService.create(
              {
                //@ts-ignore
                armamento_emprestimo: emp.id,
                armamento: element.armamentoId,
                quantidade: element.quantidade
              },
              idUser
            );
        });
      }
  
      async update(id:number, object: ArmamentoEmprestimoInterface, idUser: User) {
        var data: ArmamentoEmprestimoInterface = await this.armamentoEmprestimoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoEmprestimoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        var arms = await this.armamentosEmprestimosItensService.whereArmEmp(id);
        arms.forEach((arm) => {
          this.armamentoService.atualizarQuantidadeUp(arm.armamento.id, arm.quantidade);
        })

        return await this.armamentoEmprestimoRepository.delete(id);;
      }
}
