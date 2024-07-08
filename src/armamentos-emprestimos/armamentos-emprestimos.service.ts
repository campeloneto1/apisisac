import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Between, In, IsNull, Not, Raw, Repository } from 'typeorm';
import { ArmamentoEmprestimo as ArmamentoEmprestimoEnity } from './armamento-emprestimo.entity';
import { ArmamentoEmprestimo as ArmamentoEmprestimoInterface, ArmamentosEmprestimos as ArmamentosEmprestimosInterface } from './armamento-emprestimo.interface';
import { ArmamentosEmprestimosItensService } from 'src/armamentos-emprestimos-itens/armamentos-emprestimos-itens.service';
import { ArmamentosService } from 'src/armamentos/armamentos.service';
import { ArmamentoEmprestimoItem } from 'src/armamentos-emprestimos-itens/armamento-emprestimo-item.interface';
import { Armamento } from 'src/armamentos/armamento.interface';
import { addHours, addMinutes } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class ArmamentosEmprestimosService {
    constructor(
        @InjectRepository(ArmamentoEmprestimoEnity)
        private armamentoEmprestimoRepository: Repository<ArmamentoEmprestimoEnity>,
        private lazyModuleLoader: LazyModuleLoader,
        private armamentosEmprestimosItensService: ArmamentosEmprestimosItensService,
        private armamentoService: ArmamentosService,
        private logsService: LogsService
    ){}

    async index(params:any,idUser: User): Promise<ArmamentosEmprestimosInterface> {

          return await this.armamentoEmprestimoRepository.find({
            relations: {
              policial: {
                graduacao: true
              }
            },
            where: {
              //@ts-ignore
              subunidade: {
                id: params.subunidade
              }
            }
          });
        
      }
  
      async find(id: number, idUser: User): Promise<ArmamentoEmprestimoInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.armamentoEmprestimoRepository.findOne({
          where: {
            id: id,
            subunidade: {
              id: In(idsSubs)
            }
          } ,
          relations: {
            policial: {
              graduacao: true
            },
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
        var object2:ArmamentoEmprestimoInterface = this.armamentoEmprestimoRepository.create({...object, data_emprestimo: new Date(), created_by: idUser}) 
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

        await this.logsService.create({
          object: JSON.stringify(emp),
          mensagem: 'Cadastrou um Emprestimo de Armamento',
          tipo: 1,
          table: 'armamentos_emprestimos',
          fk: emp.id,
          user: idUser
        });
      }
  
      async update(id:number, object: ArmamentoEmprestimoInterface, idUser: User) {
        var data: ArmamentoEmprestimoInterface = await this.armamentoEmprestimoRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoEmprestimoRepository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um Emprestimo de Armamento',
          tipo: 2,
          table: 'armamentos_emprestimos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var arms = await this.armamentosEmprestimosItensService.whereArmEmp(id);

        var data = await this.armamentoEmprestimoRepository.findOne({where: {
          id: id,
        }});

        arms.forEach((arm) => {
          this.armamentoService.atualizarQuantidadeUp(arm.armamento.id, arm.quantidade);
        })

        await this.armamentoEmprestimoRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um Emprestimo de Armamento',
          tipo: 3,
          table: 'armamentos_emprestimos',
          fk: data.id,
          user: idUser
        });
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

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Recebeu um Emprestimo de Armamento',
          tipo: 2,
          table: 'armamentos_emprestimos',
          fk: object.id,
          user: idUser
        });
      }

      async emprestados(params:any, idUser:User): Promise<ArmamentosEmprestimosInterface>{
          return this.armamentoEmprestimoRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: params.subunidade
              },
              cautela: IsNull(),
              data_devolucao: IsNull()
            },
            relations: {
              policial: {
                graduacao: true
              }
            }
          })
      }

      async wherePolicial(id:number, idUser: User):Promise<ArmamentosEmprestimosInterface>{
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.armamentoEmprestimoRepository.find({
          where: {
            policial: {
              id: id
            },
            //@ts-ignore
            subunidade: {
              id: In(idsSubs)
            }
          },
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

      async relatorio(object: any, idUser: User): Promise<ArmamentoEmprestimoInterface | null> {
        var finaldate = new Date(object.data_final);
        finaldate = addHours(finaldate, 23);
        finaldate = addMinutes(finaldate, 59);
        var armamentos;
        
          armamentos = await this.armamentoEmprestimoRepository.find({
            where: {
              data_emprestimo: Between(object.data_inicial, finaldate),
              //@ts-ignore
              subunidade: {
                id: object.subunidade
              }
            },
            order: {
              id: "DESC"
            },
            relations: {
              policial: {
                graduacao: true
              },
              armamentos_emprestimos_itens: {
                armamento: {
                  modelo: true
                },
                armamento_emprestimo: false
              }
            }
          });
  
        
        
        if(object.policial){
          armamentos = armamentos.filter(element => {
            return element.policial.id === object.policial
          })
        }

        if(object.armamento){
          armamentos = armamentos.filter(element => {
            let teste = false
             element.armamentos_emprestimos_itens.forEach(item => {
               if (object.armamento === item.armamento.id){
                teste = true
               }
            });
            if(teste){
              return element;
            }
          })
        }

        return armamentos;

      }
  
}
