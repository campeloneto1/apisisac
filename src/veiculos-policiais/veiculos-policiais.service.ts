import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { VeiculosService } from 'src/veiculos/veiculos.service';
import { Between, In, IsNull, Repository } from 'typeorm';
import { VeiculoPolicial as VeiculoPolicialEntity } from './veiculo-policial.entity';
import { VeiculoPolicial as VeiculoPolicialInterface, VeiculosPoliciais as VeiculosPoliciaisInterface } from './veiculo-policial.interface';
import { addHours, addMinutes } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class VeiculosPoliciaisService {
    constructor(
        @InjectRepository(VeiculoPolicialEntity)
        private veiculoPolicialRository: Repository<VeiculoPolicialEntity>,
        @Inject(forwardRef(() => VeiculosService))
        private veiculosService: VeiculosService,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any,idUser: User): Promise<VeiculosPoliciaisInterface> {
       
        return await this.veiculoPolicialRository.find({
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
  
      async find(id: number, idUser: User): Promise<VeiculoPolicialInterface> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.veiculoPolicialRository.findOne({
          relations: {
            policial: {
              graduacao: true
            }
          },
          where: {
            id: id,
            //@ts-ignore
            subunidade: {
              id: In(idsSubs)
            }
          }
        });
      }
  
      async create(object: VeiculoPolicialInterface, idUser: User) {
        //@ts-ignore
        var veiculo = await this.veiculosService.find2(object.veiculo, idUser);
        var object:VeiculoPolicialInterface = this.veiculoPolicialRository.create({
          ...object, 
          data_inicial: new Date(), 
          km_inicial: veiculo.km_atual,
          subunidade: idUser.subunidade, 
          created_by: idUser}) 
        var save = await this.veiculoPolicialRository.save(object);  
        
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um Emprestimo de Veiculo',
          tipo: 1,
          table: 'veiculos_policiais',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: VeiculoPolicialInterface, idUser: User) {
         //@ts-ignore
         var veiculo = await this.veiculosService.find2(object.veiculo, idUser);

        var data: VeiculoPolicialInterface = await this.veiculoPolicialRository.findOneBy({id: id});
        data = {...object, km_inicial: veiculo.km_atual,}
        await this.veiculoPolicialRository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um Emprestimo de Veiculo',
          tipo: 2,
          table: 'veiculos_policiais',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.veiculoPolicialRository.findOne({where: {
          id: id,
        }});
        await this.veiculoPolicialRository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um Emprestimo de Veiculo',
          tipo: 3,
          table: 'veiculos_policiais',
          fk: data.id,
          user: idUser
        });
      }

      async receber(object:any, idUser: User){
        var data: VeiculoPolicialInterface = await this.veiculoPolicialRository.findOneBy({id: object.id});
        data = {...data, data_final: new Date(), km_final: object.km_final, observacoes: object.observacoes}
        await this.veiculoPolicialRository.update({id: object.id},{...data, updated_by: idUser});

        var veiculo = await this.veiculosService.find2(data.veiculo.id, idUser);
        veiculo.km_atual = object.km_final;
        await this.veiculosService.update(veiculo.id, veiculo, idUser);

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Recebeu um Emprestimo de Veiculo',
          tipo: 2,
          table: 'veiculos_policiais',
          fk: object.id,
          user: idUser
        });
      }

      async emprestados(params:any,idUser: User): Promise<VeiculosPoliciaisInterface> {
        
          return await this.veiculoPolicialRository.find({
            relations: {
              policial: {
                graduacao: true
              }
            },
            where: {
              data_final: IsNull(),
              //@ts-ignore
              subunidade: {
                id: params.subunidade
              }
            }
          });
        
      }

      async emprestado(params:any,idUser: User): Promise<VeiculoPolicialInterface> {
        return await this.veiculoPolicialRository.findOne({
          relations: {
            policial: {
              graduacao: true
            }
          },
          where: {
            data_final: IsNull(),
            //@ts-ignore
            subunidade: {
              id: params.subunidade
            },
            policial: {
              id: idUser.policial.id
            }
          }
        });
      
    }

      async relatorio(object:any, idUser: User): Promise<VeiculosPoliciaisInterface>{
        var finaldate = new Date(object.data_final);
        finaldate = addHours(finaldate, 23);
        finaldate = addMinutes(finaldate, 59);
        var veiculos;
        
          veiculos = await this.veiculoPolicialRository.find({
            relations: {
              policial: {
                graduacao: true
              }
            },
            where: {
              data_inicial: Between(object.data_inicial, finaldate),
              //@ts-ignore
              subunidade: {
                id: object.subunidade
              }
            },
            order: {
              id: "DESC"
            }
          });
        
        

        if(object.veiculo){
          veiculos = veiculos.filter((element) => {
            return element.veiculo.id === object.veiculo
          })
        }

        if(object.policial){
          veiculos = veiculos.filter((element) => {
            return element.policial.id === object.policial
          })
        }
        return veiculos;

      }
}
