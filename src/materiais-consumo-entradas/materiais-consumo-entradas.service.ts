import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { MateriaisConsumoService } from 'src/materiais-consumo/materiais-consumo.service';
import { User } from 'src/users/user.interface';
import { Between, Repository } from 'typeorm';
import { MaterialConsumoEntrada as MaterialConsumoEntradaEntity } from './material-consumo-entrada.entity';
import { MaterialConsumoEntrada as MaterialConsumoEntradaInterface, MateriaisConsumoEntradas as MateriaisConsumoEntradasInterface } from './material-consumo-entrada.interface';
import { MateriaisConsumoEntradasItensService } from 'src/materiais-consumo-entradas-itens/materiais-consumo-entradas-itens.service';
import { addHours, addMinutes } from 'date-fns';

@Injectable()
export class MateriaisConsumoEntradasService {
    constructor(
        @InjectRepository(MaterialConsumoEntradaEntity)
        private materialConsumoEntradaRepository: Repository<MaterialConsumoEntradaEntity>,
        private lazyModuleLoader: LazyModuleLoader,
        private materiaisConsumoEntradasItensService: MateriaisConsumoEntradasItensService,
        private materiaisConsumoService: MateriaisConsumoService,
        private logsService: LogsService
    ){}

    async index(idUser: User): Promise<MateriaisConsumoEntradasInterface> {
        if(idUser.perfil.administrador){
          return await this.materialConsumoEntradaRepository.find();
        }else{
          return await this.materialConsumoEntradaRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
      }
  
      async find(id: number, idUser: User): Promise<MaterialConsumoEntradaInterface | null> {
        return await this.materialConsumoEntradaRepository.findOne({
          where: {
            id: id,
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          } ,
          relations: {
            materiais_consumo_entradas_itens: {
              material_consumo: {
                modelo: true
              },
              material_consumo_entrada: false
            }
          }
        });
      }
  
      async create(object: MaterialConsumoEntradaInterface, idUser: User) {
        var object2:MaterialConsumoEntradaInterface = this.materialConsumoEntradaRepository.create({...object, data_entrada: new Date(), user: idUser, subunidade: idUser.subunidade, created_by: idUser}) 
        let emp = await this.materialConsumoEntradaRepository.save(object2);  
       
         object.materiais.forEach(element => {
            this.materiaisConsumoEntradasItensService.create(
              {
                //@ts-ignore
                material_consumo_entrada: emp.id,
                material_consumo: element.material_consumoId,
                quantidade: element.quantidade
              },
              idUser
            );
        });

        await this.logsService.create({
          object: JSON.stringify(emp),
          mensagem: 'Cadastrou uma entrada de material de consumo',
          tipo: 1,
          table: 'materiais_consumo_entradas',
          fk: emp.id,
          user: idUser
        });
      }
  
      async update(id:number, object: MaterialConsumoEntradaInterface, idUser: User) {
        var data: MaterialConsumoEntradaInterface = await this.materialConsumoEntradaRepository.findOneBy({id: id});
        data = {...object}
        await this.materialConsumoEntradaRepository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma entrada de material de consumo',
          tipo: 2,
          table: 'materiais_consumo_entradas',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var mats = await this.materiaisConsumoEntradasItensService.whereMatCon(id);

        var data = await this.materialConsumoEntradaRepository.findOne({where: {
          id: id,
        }});

        mats.forEach((mat) => {
          this.materiaisConsumoService.atualizarQuantidadeDown(mat.material_consumo.id, mat.quantidade);
        })

        await this.materialConsumoEntradaRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu uma entrada de material de consumo',
          tipo: 3,
          table: 'materiais_consumo_entradas',
          fk: data.id,
          user: idUser
        });
      }

      async relatorio(object: any, idUser: User): Promise<MaterialConsumoEntradaInterface | null> {
        var finaldate = new Date(object.data_final);
        finaldate = addHours(finaldate, 23);
        finaldate = addMinutes(finaldate, 59);
        var materiaisconsumo;
        if(idUser.perfil.administrador){
          materiaisconsumo = await this.materialConsumoEntradaRepository.find({
            where: {
              data_entrada: Between(object.data_inicial, finaldate),
            },
            order: {
              id: "DESC"
            },
            relations: {
              materiais_consumo_entradas_itens: {
                material_consumo: {
                  modelo: true
                },
                material_consumo_entrada: false
              }
            }
          });
  
        }else{
          materiaisconsumo = await this.materialConsumoEntradaRepository.find({
            where: {
              data_entrada: Between(object.data_inicial, finaldate),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            },
            order: {
              id: "DESC"
            },
            relations: {
              materiais_consumo_entradas_itens: {
                material_consumo: {
                  modelo: true
                },
                material_consumo_entrada: false
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
             element.materiais_consumo_entradas_itens.forEach(item => {
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
