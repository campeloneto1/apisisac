import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Between, In, IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { VeiculoOficina as VeiculoOficinaEntity } from './veiculo-oficina.entity';
import { VeiculoOficina as VeiculoOficinaInterface, VeiculosOficinas as VeiculosOficinasInterface } from './veiculo-oficina.interface';
import { VeiculosService } from 'src/veiculos/veiculos.service';
import { addHours, addMinutes } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class VeiculosOficinasService {
    constructor(
        @InjectRepository(VeiculoOficinaEntity)
        private veiculoOficinaRository: Repository<VeiculoOficinaEntity>,
        @Inject(forwardRef(() => VeiculosService))
        private veiculosService: VeiculosService,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any,idUser: User): Promise<VeiculosOficinasInterface> {
          
            return await this.veiculoOficinaRository.find({
              where: {
                //@ts-ignore
                subunidade: {
                  id: params.subunidade
                }
              }
            });
          
      }
  
      async find(id: number, idUser: User): Promise<VeiculoOficinaInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.veiculoOficinaRository.findOne({where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: In(idsSubs)
          }
        }});
      }
  
      async create(object: VeiculoOficinaInterface, idUser: User) {
        //@ts-ignore
        var veiculo = await this.veiculosService.find2(object.veiculo, idUser);
        var object:VeiculoOficinaInterface = this.veiculoOficinaRository.create({
          ...object, 
          data_inicial: new Date(), 
          km_inicial: veiculo.km_atual,
          created_by: idUser}) 
        var save = await this.veiculoOficinaRository.save(object);      

        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma Manutencao de Veiculo',
          tipo: 1,
          table: 'veiculos_oficinas',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: VeiculoOficinaInterface, idUser: User) {
         //@ts-ignore
         var veiculo = await this.veiculosService.find2(object.veiculo, idUser);

        var data: VeiculoOficinaInterface = await this.veiculoOficinaRository.findOneBy({id: id});
        data = {...object, km_inicial: veiculo.km_atual,}
        await this.veiculoOficinaRository.update({id:id},{...data, updated_by: idUser});

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma Manutencao de Veiculo',
          tipo: 2,
          table: 'veiculos_oficinas',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.veiculoOficinaRository.findOne({where: {
          id: id,
        }});
        await this.veiculoOficinaRository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu uma Manutencao de Veiculo',
          tipo: 3,
          table: 'veiculos_oficinas',
          fk: data.id,
          user: idUser
        });
      }

      async receber(object:any, idUser: User){
        var data: VeiculoOficinaInterface = await this.veiculoOficinaRository.findOneBy({id: object.id});
        data = {...data, data_final: new Date(), km_final: object.km_final, observacoes: object.observacoes}
        await this.veiculoOficinaRository.update({id: object.id},{...data, updated_by: idUser});

        var veiculo = await this.veiculosService.find2(data.veiculo.id, idUser );
        veiculo.km_atual = object.km_final;
        await this.veiculosService.update(veiculo.id, veiculo, idUser);

        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Recebeu uma Manutencao de Veiculo',
          tipo: 2,
          table: 'veiculos_oficinas',
          fk: object.id,
          user: idUser
        });
      }

      async emmanutencao(params:any,idUser: User): Promise<VeiculosOficinasInterface> {
        
          return await this.veiculoOficinaRository.find({
            where: {
              data_final: IsNull(),
              //@ts-ignore
              subunidade: {
                id: params.subunidade
              }
            }
          });
        
      }

      async relatorio(object:any, idUser: User): Promise<VeiculosOficinasInterface>{
        var finaldate = new Date(object.data_final);
        finaldate = addHours(finaldate, 23);
        finaldate = addMinutes(finaldate, 59);
        var veiculos;
        
          veiculos = await this.veiculoOficinaRository.find({
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

        if(object.oficina){
          veiculos = veiculos.filter((element) => {
            return element.oficina.id === object.oficina
          })
        }

        if(object.manutencao_tipo){
          veiculos = veiculos.filter((element) => {
            return element.manutencao_tipo.id === object.manutencao_tipo
          })
        }

        return veiculos;

      }
}
