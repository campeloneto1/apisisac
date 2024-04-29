import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { IsNull, Repository } from 'typeorm';
import { VeiculoOficina as VeiculoOficinaEntity } from './veiculo-oficina.entity';
import { VeiculoOficina as VeiculoOficinaInterface, VeiculosOficinas as VeiculosOficinasInterface } from './veiculo-oficina.interface';
import { VeiculosService } from 'src/veiculos/veiculos.service';

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
        return await this.veiculoOficinaRository.find({
          where: {
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        });
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
        var veiculo = await this.veiculosService.find(object.veiculo, idUser);
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
         var veiculo = await this.veiculosService.find(object.veiculo, idUser);

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

        var veiculo = await this.veiculosService.find(data.veiculo.id, idUser );
        veiculo.km_atual = object.km_final;
        await this.veiculosService.update(veiculo.id, veiculo, idUser);
      }

      async emmanutencao(idUser: User): Promise<VeiculosOficinasInterface> {
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