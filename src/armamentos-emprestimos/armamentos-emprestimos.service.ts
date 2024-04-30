import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoEmprestimo as ArmamentoEmprestimoEnity } from './armamento-emprestimo.entity';
import { ArmamentoEmprestimo as ArmamentoEmprestimoInterface, ArmamentosEmprestimos as ArmamentosEmprestimosInterface } from './armamento-emprestimo.interface';
import { ArmamentosEmprestimosItensService } from 'src/armamentos-emprestimos-itens/armamentos-emprestimos-itens.service';
import { ArmamentosService } from 'src/armamentos/armamentos.service';
import { ArmamentoEmprestimoItem } from 'src/armamentos-emprestimos-itens/armamento-emprestimo-item.interface';
import { Armamento } from 'src/armamentos/armamento.interface';

@Injectable()
export class ArmamentosEmprestimosService {
    constructor(
        @InjectRepository(ArmamentoEmprestimoEnity)
        private armamentoEmprestimoRepository: Repository<ArmamentoEmprestimoEnity>,
        private lazyModuleLoader: LazyModuleLoader,
        private armamentosEmprestimosItensService: ArmamentosEmprestimosItensService,
        private armamentoService: ArmamentosService,
        
    ){}

    async index(idUser: User): Promise<ArmamentosEmprestimosInterface> {
        return await this.armamentoEmprestimoRepository.find({
          where: {
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        });
      }
  
      async find(id: number, idUser: User): Promise<ArmamentoEmprestimoInterface | null> {
        return await this.armamentoEmprestimoRepository.findOne({
          where: {
            id: id,
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          } ,
          relations: {
            armamentos_emprestimos_itens: {
              armamento: {
                modelo: true
              },
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

      async receber(object,  idUser: User){
        var data: ArmamentoEmprestimoInterface = await this.armamentoEmprestimoRepository.findOneBy({id: object.id});
        data.observacoes = object.observacoes;
        await this.armamentoEmprestimoRepository.update({id:object.id},{...data, data_devolucao: new Date(), updated_by: idUser});
        
         object.armamentos.forEach(async element => {
          var armemp:ArmamentoEmprestimoItem = await this.armamentosEmprestimosItensService.find(element.id);
          if(element.quantidade != armemp.quantidade){
            await this.armamentoService.atualizarQuantidadeUp(armemp.armamento.id, element.quantidade);
            armemp.quantidade_devolucao = element.quantidade;
            await this.armamentosEmprestimosItensService.update(armemp.id, armemp, idUser);
            var dif = armemp.quantidade - element.quantidade;
            var arma:Armamento = await this.armamentoService.find2(armemp.armamento.id, idUser);
            arma.quantidade = arma.quantidade - dif;
            await this.armamentoService.update(arma.id, arma, idUser);
          }else{
            await this.armamentoService.atualizarQuantidadeUp(armemp.armamento.id, element.quantidade);
            armemp.quantidade_devolucao = element.quantidade;
            await this.armamentosEmprestimosItensService.update(armemp.id, armemp, idUser);
          }
         
        });

      }
}
