import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoEmprestimoItem as ArmamentoEsmprestimoItemEntity } from './armamento-emprestimo-item.entity';
import { ArmamentoEmprestimoItem as  ArmamentoEsmprestimoItemInterface, ArmamentosEmprestimosItens as ArmamentosEmprestimosItensInterface} from './armamento-emprestimo-item.interface';
import { ArmamentosService } from 'src/armamentos/armamentos.service';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ArmamentosEmprestimosItensService {
    constructor(
        @InjectRepository(ArmamentoEsmprestimoItemEntity)
        private armamentoEmprestimoItemRepository: Repository<ArmamentoEsmprestimoItemEntity>,
        private lazyModuleLoader: LazyModuleLoader,
        private logsService: LogsService,
        private armamentosService: ArmamentosService
    ){}

    async index(): Promise<ArmamentosEmprestimosItensInterface> {
        return await this.armamentoEmprestimoItemRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoEsmprestimoItemInterface | null> {
        return await this.armamentoEmprestimoItemRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoEsmprestimoItemInterface, idUser: User) {
        var object:ArmamentoEsmprestimoItemInterface = this.armamentoEmprestimoItemRepository.create({...object, created_by: idUser}) 
        var save = await this.armamentoEmprestimoItemRepository.save(object);      

        //@ts-ignore
        this.armamentosService.atualizarQuantidadeDown(object.armamento, object.quantidade);

        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um item no emprestimo de armamento',
          tipo: 1,
          table: 'armamentos_emprestimos_itens',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: ArmamentoEsmprestimoItemInterface, idUser: User) {
        var data: ArmamentoEsmprestimoItemInterface = await this.armamentoEmprestimoItemRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoEmprestimoItemRepository.update({id:id},{...data, updated_by: idUser});

      }
  
      async remove(id: number, idUser: User) {
        var object:ArmamentoEsmprestimoItemInterface = await this.armamentoEmprestimoItemRepository.findOne({where: {id: id}});
        this.armamentosService.atualizarQuantidadeUp(object.armamento.id, object.quantidade);
        await this.armamentoEmprestimoItemRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(object),
          mensagem: 'Excluiu um item no emprestimo de armamento',
          tipo: 3,
          table: 'armamentos_emprestimos_itens',
          fk: object.id,
          user: idUser
        });
      }

      async whereArmEmp(id:number): Promise<ArmamentosEmprestimosItensInterface>{
        return await this.armamentoEmprestimoItemRepository.find({
          where: {
            armamento_emprestimo: {
              id: id
            }
          }
        });
      }
}
