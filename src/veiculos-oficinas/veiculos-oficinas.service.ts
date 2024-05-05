import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Between, IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { VeiculoOficina as VeiculoOficinaEntity } from './veiculo-oficina.entity';
import { VeiculoOficina as VeiculoOficinaInterface, VeiculosOficinas as VeiculosOficinasInterface } from './veiculo-oficina.interface';
import { VeiculosService } from 'src/veiculos/veiculos.service';
import { addHours, addMinutes } from 'date-fns';

@Injectable()
export class VeiculosOficinasService {
    constructor(
        @InjectRepository(VeiculoOficinaEntity)
        private veiculoOficinaRository: Repository<VeiculoOficinaEntity>,
        @Inject(forwardRef(() => VeiculosService))
        private veiculosService: VeiculosService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<VeiculosOficinasInterface> {
          if(idUser.perfil.administrador){
            return await this.veiculoOficinaRository.find();
          }else{
            return await this.veiculoOficinaRository.find({
              where: {
                //@ts-ignore
                subunidade: {
                  id: idUser.subunidade.id
                }
              }
            });
          }
      }
  
      async find(id: number, idUser: User): Promise<VeiculoOficinaInterface | null> {
        return await this.veiculoOficinaRository.findOne({where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: idUser.subunidade.id
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
          subunidade: idUser.subunidade, 
          created_by: idUser}) 
        await this.veiculoOficinaRository.save(object);      
      }
  
      async update(id:number, object: VeiculoOficinaInterface, idUser: User) {
         //@ts-ignore
         var veiculo = await this.veiculosService.find2(object.veiculo, idUser);

        var data: VeiculoOficinaInterface = await this.veiculoOficinaRository.findOneBy({id: id});
        data = {...object, km_inicial: veiculo.km_atual,}
        await this.veiculoOficinaRository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.veiculoOficinaRository.delete(id);;
      }

      async receber(object:any, idUser: User){
        var data: VeiculoOficinaInterface = await this.veiculoOficinaRository.findOneBy({id: object.id});
        data = {...data, data_final: new Date(), km_final: object.km_final, observacoes: object.observacoes}
        await this.veiculoOficinaRository.update({id: object.id},{...data, updated_by: idUser});

        var veiculo = await this.veiculosService.find2(data.veiculo.id, idUser );
        veiculo.km_atual = object.km_final;
        await this.veiculosService.update(veiculo.id, veiculo, idUser);
      }

      async emmanutencao(idUser: User): Promise<VeiculosOficinasInterface> {
        if(idUser.perfil.administrador){
          return await this.veiculoOficinaRository.find({
            where: {
              data_final: IsNull(),
              
            }
          });
        }else{
          return await this.veiculoOficinaRository.find({
            where: {
              data_final: IsNull(),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
      }

      async relatorio(object:any, idUser: User): Promise<VeiculosOficinasInterface>{
        var finaldate = new Date(object.data_final);
        finaldate = addHours(finaldate, 23);
        finaldate = addMinutes(finaldate, 59);
        var veiculos;
        if(idUser.perfil.administrador){
          veiculos = await this.veiculoOficinaRository.find({
            where: {
              data_inicial: Between(object.data_inicial, finaldate),
            },
            order: {
              id: "DESC"
            }
          });
        }else{
          veiculos = await this.veiculoOficinaRository.find({
            where: {
              data_inicial: Between(object.data_inicial, finaldate),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            },
            order: {
              id: "DESC"
            }
          });
        }
       

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
