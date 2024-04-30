import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, MoreThan, MoreThanOrEqual, Not, Raw, Repository } from 'typeorm';
import { Veiculo as VeiculoEntity } from './veiculo.entity';
import { Veiculo as VeiculoInterface, Veiculos as VeiculosInterface } from './veiculo.interface';
import { User } from 'src/users/user.interface';
import { VeiculosOficinasService } from 'src/veiculos-oficinas/veiculos-oficinas.service';
import { VeiculosPoliciaisService } from 'src/veiculos-policiais/veiculos-policiais.service';

@Injectable()
export class VeiculosService {
    constructor(
        @InjectRepository(VeiculoEntity)
        private veiculoRepository: Repository<VeiculoEntity>,
        @Inject(forwardRef(() => VeiculosOficinasService))
        private veiculosOficinasService: VeiculosOficinasService,
        @Inject(forwardRef(() => VeiculosPoliciaisService))
        private veiculosPoliciaisService: VeiculosPoliciaisService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<VeiculosInterface> {
        return await this.veiculoRepository.find({
          where: {
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        });
      }
  
      async find(id: number, idUser: User): Promise<VeiculoInterface | null> {
        return await this.veiculoRepository.findOne({
          relations: {
            veiculos_oficinas: {
              veiculo: false
            },
            veiculos_policiais: {
              policial: {
                graduacao: true
              },
              veiculo: false
            }
          },
          where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: idUser.subunidade.id
          }
        }});
      }

      async find2(id: number, idUser: User): Promise<VeiculoInterface | null> {
        return await this.veiculoRepository.findOne({
          where: {
          id: id,
          //@ts-ignore
          subunidade: {
            id: idUser.subunidade.id
          }
        }});
      }
  
      async create(object: VeiculoInterface, idUser: User) {
        var object:VeiculoInterface = this.veiculoRepository.create({...object, km_atual: object.km_inicial, subunidade: idUser.subunidade, created_by: idUser}) 
        await this.veiculoRepository.save(object);      
      }
  
      async update(id:number, object: VeiculoInterface, idUser: User) {
        var data: VeiculoInterface = await this.veiculoRepository.findOneBy({id: id});
        data = {...object}
       
        await this.veiculoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.veiculoRepository.delete(id);;
      }

      async disponiveis(idUser: User): Promise<VeiculosInterface> {
        var naoficina = await this.veiculosOficinasService.emmanutencao(idUser);
        var emprestados = await this.veiculosPoliciaisService.emprestados(idUser);
        var ids = [];
        naoficina.forEach(element => {
          ids.push(element.veiculo.id)
        });
         emprestados.forEach(element => {
           ids.push(element.veiculo.id)
         });

        return await this.veiculoRepository.find({
          where: {
            id: Not(In(ids)),
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        });
      }
  
      async trocaoleo(idUser: User): Promise<VeiculosInterface> {
        return await this.veiculoRepository.find({
          where: {
            km_troca_oleo: Not(IsNull()),
            km_atual:  Raw((alias) => `${alias} >= km_troca_oleo - 100`),
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        });
      }
}
