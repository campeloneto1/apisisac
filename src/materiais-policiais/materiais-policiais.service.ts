import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Between, IsNull, Not, Raw, Repository } from 'typeorm';
import { MaterialPolicial as MaterialPolicialEnity } from './material-policial.entity';
import { MaterialPolicial as MaterialPolicialInterface, MateriaisPoliciais as MateriaisPoliciaisInterface } from './material-policial.interface';
import { addHours, addMinutes } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';
import { MateriaisPoliciaisItensService } from 'src/materiais-policiais-itens/materiais-policiais-itens.service';
import { MateriaisService } from 'src/materiais/materiais.service';
import { MaterialPolicialItem } from 'src/materiais-policiais-itens/material-policial-item.interface';
import { Material } from 'src/materiais/material.interface';

@Injectable()
export class MateriaisPoliciaisService {
    constructor(
        @InjectRepository(MaterialPolicialEnity)
        private materiaisPoliciaisRepository: Repository<MaterialPolicialEnity>,
        private lazyModuleLoader: LazyModuleLoader,
        private materiaisPoliciaisIntensService: MateriaisPoliciaisItensService,
        private materiaisService: MateriaisService,
        private logsService: LogsService
    ){}

    async index(idUser: User): Promise<MateriaisPoliciaisInterface> {
        if(idUser.perfil.administrador){
          return await this.materiaisPoliciaisRepository.find();
        }else{
          return await this.materiaisPoliciaisRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
      }
  
      async find(id: number, idUser: User): Promise<MaterialPolicialInterface | null> {
        return await this.materiaisPoliciaisRepository.findOne({
          where: {
            id: id,
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          } ,
          relations: {
            materiais_policiais_itens: {
              material: {
                modelo: true
              },
              material_policial: false
            }
          }
        });
      }
  
      async create(object: MaterialPolicialInterface, idUser: User) {
        var object2:MaterialPolicialInterface = this.materiaisPoliciaisRepository.create({...object, data_emprestimo: new Date(), subunidade: idUser.subunidade, created_by: idUser}) 
        let emp = await this.materiaisPoliciaisRepository.save(object2);  
         object.materiais.forEach(element => {
            this.materiaisPoliciaisIntensService.create(
              {
                //@ts-ignore
                material_policial: emp.id,
                material: element.materialId,
                quantidade: element.quantidade
              },
              idUser
            );
        });

        await this.logsService.create({
          object: JSON.stringify(emp),
          mensagem: 'Cadastrou um emprestimo de material',
          tipo: 1,
          table: 'materiais_policiais',
          fk: emp.id,
          user: idUser
        });
      }
  
      async update(id:number, object: MaterialPolicialInterface, idUser: User) {
        var data: MaterialPolicialInterface = await this.materiaisPoliciaisRepository.findOneBy({id: id});
        data = {...object}
        await this.materiaisPoliciaisRepository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um emprestimo de material',
          tipo: 2,
          table: 'materiais_policiais',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var mats = await this.materiaisPoliciaisIntensService.whereMatEmp(id);

        var data = await this.materiaisPoliciaisRepository.findOne({where: {
          id: id,
        }});

        mats.forEach((arm) => {
          this.materiaisService.atualizarQuantidadeUp(arm.material.id, arm.quantidade);
        })

        await this.materiaisPoliciaisRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um emprestimo de material',
          tipo: 3,
          table: 'materiais_policiais',
          fk: data.id,
          user: idUser
        });
      }

      async receber(object,  idUser: User){
        var data: MaterialPolicialInterface = await this.materiaisPoliciaisRepository.findOneBy({id: object.id});
        data.observacoes = object.observacoes;
        await this.materiaisPoliciaisRepository.update({id:object.id},{...data, data_devolucao: new Date(), updated_by: idUser});
        
         object.materiais.forEach(async element => {
          var armemp:MaterialPolicialItem = await this.materiaisPoliciaisIntensService.find(element.id);
          if(element.quantidade != armemp.quantidade){
            await this.materiaisService.atualizarQuantidadeUp(armemp.material.id, element.quantidade);
            armemp.quantidade_devolucao = element.quantidade;
            await this.materiaisPoliciaisIntensService.update(armemp.id, armemp, idUser);
            var dif = armemp.quantidade - element.quantidade;
            var arma:Material = await this.materiaisService.find2(armemp.material.id, idUser);
            arma.quantidade = arma.quantidade - dif;
            await this.materiaisService.update(arma.id, arma, idUser);
          }else{
            await this.materiaisService.atualizarQuantidadeUp(armemp.material.id, element.quantidade);
            armemp.quantidade_devolucao = element.quantidade;
            await this.materiaisPoliciaisIntensService.update(armemp.id, armemp, idUser);
          }
         
        });

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Recebeu um Emprestimo de material',
          tipo: 2,
          table: 'materiais_policiais',
          fk: object.id,
          user: idUser
        });
      }

      async emprestados(idUser:User): Promise<MateriaisPoliciaisInterface>{
          return this.materiaisPoliciaisRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
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

      async relatorio(object: any, idUser: User): Promise<MaterialPolicialInterface | null> {
        var finaldate = new Date(object.data_final);
        finaldate = addHours(finaldate, 23);
        finaldate = addMinutes(finaldate, 59);
        var materiais;
        if(idUser.perfil.administrador){
          materiais = await this.materiaisPoliciaisRepository.find({
            where: {
              data_emprestimo: Between(object.data_inicial, finaldate),
              
            },
            order: {
              id: "DESC"
            },
            relations: {
              materiais_policiais_itens: {
                material: {
                  modelo: true
                },
                material_policial: false
              }
            }
          });
  
        }else{
          materiais = await this.materiaisPoliciaisRepository.find({
            where: {
              data_emprestimo: Between(object.data_inicial, finaldate),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            },
            order: {
              id: "DESC"
            },
            relations: {
              materiais_policiais_itens: {
                material: {
                  modelo: true
                },
                material_policial: false
              }
            }
          });
  
        }
        
        if(object.policial){
          materiais = materiais.filter(element => {
            return element.policial.id === object.policial
          })
        }

        if(object.material){
          materiais = materiais.filter(element => {
            let teste = false
             element.materiais_emprestimos_itens.forEach(item => {
               if (object.material === item.material.id){
                teste = true
               }
            });
            if(teste){
              return element;
            }
          })
        }

        return materiais;

      }
}
