import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Raw, Repository } from 'typeorm';
import { Veiculo as VeiculoEntity } from './veiculo.entity';
import { Veiculo as VeiculoInterface, Veiculos as VeiculosInterface } from './veiculo.interface';
import { User } from 'src/users/user.interface';
import { VeiculosOficinasService } from 'src/veiculos-oficinas/veiculos-oficinas.service';
import { VeiculosPoliciaisService } from 'src/veiculos-policiais/veiculos-policiais.service';
import { LogsService } from 'src/logs/logs.service';
import { format } from 'date-fns';

@Injectable()
export class VeiculosService {
    constructor(
        @InjectRepository(VeiculoEntity)
        private veiculoRepository: Repository<VeiculoEntity>,
        private logsService: LogsService,
        @Inject(forwardRef(() => VeiculosOficinasService))
        private veiculosOficinasService: VeiculosOficinasService,
        @Inject(forwardRef(() => VeiculosPoliciaisService))
        private veiculosPoliciaisService: VeiculosPoliciaisService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<VeiculosInterface> {
        if(idUser.perfil.administrador){
          return await this.veiculoRepository.find();
        }else{
          return await this.veiculoRepository.find({
            where: {
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
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
        var save = await this.veiculoRepository.save(object);   
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um Veiculo',
          tipo: 1,
          table: 'veiculos',
          fk: save.id,
          user: idUser
        });   
      }
  
      async update(id:number, object: VeiculoInterface, idUser: User) {
        var data: VeiculoInterface = await this.veiculoRepository.findOneBy({id: id});
        data = {...object}
       
        await this.veiculoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um Veiculo',
          tipo: 2,
          table: 'veiculos',
          fk: id,
          user: idUser
        });

      }
  
      async remove(id: number, idUser: User) {
        var data = await this.veiculoRepository.findOne({where: {
          id: id,
        }});
        await this.veiculoRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um Veiculo',
          tipo: 3,
          table: 'veiculos',
          fk: data.id,
          user: idUser
        });
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

        if(idUser.perfil.administrador){
          return await this.veiculoRepository.find({
            where: {
              id: Not(In(ids)),
              data_baixa: IsNull()
            }
          });
        }else{
          return await this.veiculoRepository.find({
            where: {
              id: Not(In(ids)),
              data_baixa: IsNull(),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          });
        }
      }
  
      async trocaoleo(idUser: User): Promise<VeiculosInterface> {
        return await this.veiculoRepository.find({
          where: {
            km_troca_oleo: Not(IsNull()),
            km_atual:  Raw((alias) => `${alias} >= km_troca_oleo - 100`),
            data_baixa: IsNull(),
            //@ts-ignore
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        });
      }

      async revisao(idUser: User): Promise<VeiculosInterface> {
        let result = new Date();
        var proxsemana = result.setDate(result.getDate() + 30);
        return await this.veiculoRepository.find({
          where: [
            {
              km_revisao: Not(IsNull()),
              km_atual:  Raw((alias) => `${alias} >= km_revisao - 100`),
              data_baixa: IsNull(),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            },
            {
              //@ts-ignore
              data_revisao: LessThanOrEqual(format(proxsemana, 'yyyy-MM-dd')),
              data_baixa: IsNull(),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          ]
        });
      }


      async relatorio(object: any, idUser: User): Promise<VeiculosInterface>{
        var veiculos;

        if(idUser.perfil.administrador){
          veiculos = await this.veiculoRepository.find({
            where: {
              data_baixa: IsNull(),
            },
            order: {
              placa: 'ASC'
            }
          });
        }else{
          veiculos = await this.veiculoRepository.find({
            where: {
              data_baixa: IsNull(),
              //@ts-ignore
              subunidade: {
                id: idUser.subunidade.id
              }
            },
            order: {
              placa: 'ASC'
            }
          });
        }

        if(object.marca){
          veiculos = veiculos.filter(element => {
            return element.modelo.marca.id === object.marca;
          })
        }

        if(object.modelo){
          veiculos = veiculos.filter(element => {
            return element.modelo.id === object.modelo;
          })
        }

        if(object.veiculo_tipo){
          veiculos = veiculos.filter(element => {
            return element.veiculo_tipo.id === object.veiculo_tipo;
          })
        }

        if(object.blindado){
          veiculos = veiculos.filter(element => {
            return element.blindado === true;
          })
        }

        if(object.organico){
          veiculos = veiculos.filter(element => {
            return element.organico === true;
          })
        }

        if(object.locado){
          veiculos = veiculos.filter(element => {
            return element.organico !== true;
          })
        }
        
        if(object.data_baixa){
          veiculos = veiculos.filter(element => {
            return element.data_baixa !== null;
          })
        }

        return veiculos
      }
}
