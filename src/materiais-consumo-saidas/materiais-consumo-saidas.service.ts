import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { MateriaisConsumoService } from 'src/materiais-consumo/materiais-consumo.service';
import { Between, Repository } from 'typeorm';
import { MaterialConsumoSaida as MaterialConsumoSaidaEntity } from './material-consumo-saida.entity';
import { MaterialConsumoSaida as MaterialConsumoSaidaInterface, MateriaisConsumoSaidas as MateriaisConsumoSaidasInterface } from './material-consumo-saida.interface';
import { User } from 'src/users/user.interface';
import { MateriaisConsumoSaidasItensService } from 'src/materiais-consumo-saidas-itens/materiais-consumo-saidas-itens.service';
import { addHours, addMinutes } from 'date-fns';

@Injectable()
export class MateriaisConsumoSaidasService {
    constructor(
        @InjectRepository(MaterialConsumoSaidaEntity)
        private amaterialConsumoSaidaRepository: Repository<MaterialConsumoSaidaEntity>,
        private lazyModuleLoader: LazyModuleLoader,
        private materiaisConsumoSaidasItensService: MateriaisConsumoSaidasItensService,
        private materiaisConsumoService: MateriaisConsumoService,
        private logsService: LogsService
    ){}

    async index(idUser: User): Promise<MateriaisConsumoSaidasInterface> {
        if(idUser.perfil.administrador){
          return await this.amaterialConsumoSaidaRepository.find({
            relations: {
              user: {
                policial: {
                  graduacao: true
                }
              }
            }
          });
        }else{
          return await this.amaterialConsumoSaidaRepository.find({
            relations: {
              user: {
                policial: {
                  graduacao: true
                }
              }
            },
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
      }
  
      async find(id: number, idUser: User): Promise<MaterialConsumoSaidaInterface | null> {
        return await this.amaterialConsumoSaidaRepository.findOne({
          where: {
            id: id,
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          } ,
          relations: {
            user: true,
            materiais_consumo_saidas_itens: {
              material_consumo: {
                modelo: true
              },
              material_consumo_saida: false
            }
          }
        });
      }
  
      async create(object: MaterialConsumoSaidaInterface, idUser: User) {
        var object2:MaterialConsumoSaidaInterface = this.amaterialConsumoSaidaRepository.create({...object, data_saida: new Date(), subunidade: idUser.subunidade, created_by: idUser}) 
        let emp = await this.amaterialConsumoSaidaRepository.save(object2);  
       
         object.materiais.forEach(element => {
            this.materiaisConsumoSaidasItensService.create(
              {
                //@ts-ignore
                material_consumo_saida: emp.id,
                material_consumo: element.material_consumoId,
                quantidade: element.quantidade
              },
              idUser
            );
        });

        await this.logsService.create({
          object: JSON.stringify(emp),
          mensagem: 'Cadastrou uma saida de material de consumo',
          tipo: 1,
          table: 'materiais_consumo_saidas',
          fk: emp.id,
          user: idUser
        });
      }
  
      async update(id:number, object: MaterialConsumoSaidaInterface, idUser: User) {
        var data: MaterialConsumoSaidaInterface = await this.amaterialConsumoSaidaRepository.findOneBy({id: id});
        data = {...object}
        await this.amaterialConsumoSaidaRepository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma saida de material de consumo',
          tipo: 2,
          table: 'materiais_consumo_saidas',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var mats = await this.materiaisConsumoSaidasItensService.whereMatCon(id);

        var data = await this.amaterialConsumoSaidaRepository.findOne({where: {
          id: id,
        }});

        mats.forEach((mat) => {
          this.materiaisConsumoService.atualizarQuantidadeUp(mat.material_consumo.id, mat.quantidade);
        })

        await this.amaterialConsumoSaidaRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu uma saida de material de consumo',
          tipo: 3,
          table: 'materiais_consumo_saidas',
          fk: data.id,
          user: idUser
        });
      }

      async relatorio(object: any, idUser: User): Promise<MaterialConsumoSaidaInterface | null> {
        var finaldate = new Date(object.data_final);
        finaldate = addHours(finaldate, 23);
        finaldate = addMinutes(finaldate, 59);
        var materiaisconsumo;
        if(idUser.perfil.administrador){
          materiaisconsumo = await this.amaterialConsumoSaidaRepository.find({
            where: {
              data_saida: Between(object.data_inicial, finaldate),
              
            },
            order: {
              id: "DESC"
            },
            relations: {
              user: {
                policial: {
                  graduacao: true
                }
              },
              materiais_consumo_saidas_itens: {
                material_consumo: {
                  modelo: true
                },
                material_consumo_saida: false
              }
            }
          });
  
        }else{
          materiaisconsumo = await this.amaterialConsumoSaidaRepository.find({
            where: {
              data_saida: Between(object.data_inicial, finaldate),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            },
            order: {
              id: "DESC"
            },
            relations: {
              user: {
                policial: {
                  graduacao: true
                }
              },
              materiais_consumo_saidas_itens: {
                material_consumo: {
                  modelo: true
                },
                material_consumo_saida: false
              }
            }
          });
  
        }
        
        if(object.user){
          materiaisconsumo = materiaisconsumo.filter(element => {
            return element.user.id === object.user
          })
        }

        if(object.material_consumo){
          materiaisconsumo = materiaisconsumo.filter(element => {
            let teste = false
             element.materiais_consumo_saidas_itens.forEach(item => {
               if (object.materiais_consumo === item.materiais_consumo.id){
                teste = true
               }
            });
            if(teste){
              return element;
            }
          })
        }

        return materiaisconsumo;

      }
}
