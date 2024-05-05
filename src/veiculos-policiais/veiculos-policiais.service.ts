import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { VeiculosService } from 'src/veiculos/veiculos.service';
import { Between, IsNull, Repository } from 'typeorm';
import { VeiculoPolicial as VeiculoPolicialEntity } from './veiculo-policial.entity';
import { VeiculoPolicial as VeiculoPolicialInterface, VeiculosPoliciais as VeiculosPoliciaisInterface } from './veiculo-policial.interface';
import { addHours, addMinutes } from 'date-fns';

@Injectable()
export class VeiculosPoliciaisService {
    constructor(
        @InjectRepository(VeiculoPolicialEntity)
        private veiculoPolicialRository: Repository<VeiculoPolicialEntity>,
        @Inject(forwardRef(() => VeiculosService))
        private veiculosService: VeiculosService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<VeiculosPoliciaisInterface> {
       if(idUser.perfil.administrador){
        return await this.veiculoPolicialRository.find();
       }else{
        return await this.veiculoPolicialRository.find({
          where: {
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        });
       }
      }
  
      async find(id: number, idUser: User): Promise<VeiculoPolicialInterface | null> {
        return await this.veiculoPolicialRository.findOne({where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: idUser.subunidade.id
          }
        }});
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
        await this.veiculoPolicialRository.save(object);      
      }
  
      async update(id:number, object: VeiculoPolicialInterface, idUser: User) {
         //@ts-ignore
         var veiculo = await this.veiculosService.find2(object.veiculo, idUser);

        var data: VeiculoPolicialInterface = await this.veiculoPolicialRository.findOneBy({id: id});
        data = {...object, km_inicial: veiculo.km_atual,}
        await this.veiculoPolicialRository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.veiculoPolicialRository.delete(id);;
      }

      async receber(object:any, idUser: User){
        var data: VeiculoPolicialInterface = await this.veiculoPolicialRository.findOneBy({id: object.id});
        data = {...data, data_final: new Date(), km_final: object.km_final, observacoes: object.observacoes}
        await this.veiculoPolicialRository.update({id: object.id},{...data, updated_by: idUser});

        var veiculo = await this.veiculosService.find2(data.veiculo.id, idUser);
        veiculo.km_atual = object.km_final;
        await this.veiculosService.update(veiculo.id, veiculo, idUser);
      }

      async emprestados(idUser: User): Promise<VeiculosPoliciaisInterface> {
        if(idUser.perfil.administrador){
          return await this.veiculoPolicialRository.find({
            where: {
              data_final: IsNull(),
            }
          });
        }else{
          return await this.veiculoPolicialRository.find({
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

      async relatorio(object:any, idUser: User): Promise<VeiculosPoliciaisInterface>{
        var finaldate = new Date(object.data_final);
        finaldate = addHours(finaldate, 23);
        finaldate = addMinutes(finaldate, 59);
        var veiculos;
        if(idUser.perfil.administrador){
          veiculos = await this.veiculoPolicialRository.find({
            where: {
              data_inicial: Between(object.data_inicial, finaldate),
            },
            order: {
              id: "DESC"
            }
          });
        }else{
          veiculos = await this.veiculoPolicialRository.find({
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

        if(object.policial){
          veiculos = veiculos.filter((element) => {
            return element.policial.id === object.policial
          })
        }
        return veiculos;

      }
}
