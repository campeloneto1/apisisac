import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { In, Repository } from 'typeorm';
import { Contrato as ContratoEntity } from './contrato.entity';
import { Contrato as ContratoInterface, Contratos as ContratosInterface  } from './contrato.interface';

@Injectable()
export class ContratosService {
    constructor(
        @InjectRepository(ContratoEntity)
        private contratoRepository: Repository<ContratoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any,idUser: User): Promise<ContratosInterface> {
     
        return await this.contratoRepository.find({
          relations: {
            gestor: {
              graduacao: true
            },
            fiscal: {
              graduacao: true
            }
          },
            where: {
                subunidade: {
                    id: params.subunidade
                }
            }
        });
      
    }
  
      async find(id: number, idUser:User): Promise<ContratoInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.contratoRepository.findOne({
          relations: {
            contratos_lancamentos: true,
            gestor: {
              graduacao: true
            },
            fiscal: {
              graduacao: true
            }
          },
          where: {
            id: id,
            subunidade: {
              id: In(idsSubs)
            }
          }
        });
      }
  
      async create(object: ContratoInterface, idUser: User) {
        var object:ContratoInterface = this.contratoRepository.create({...object, created_by: idUser}) 
        var save = await this.contratoRepository.save(object);     
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um contrato',
          tipo: 1,
          table: 'contratos',
          fk: save.id,
          user: idUser
        }); 
      }
  
      async update(id:number, object: ContratoInterface, idUser: User) {
        var data: ContratoInterface = await this.contratoRepository.findOneBy({id: id});
        
        data = {...object}
        await this.contratoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma contrato',
          tipo: 2,
          table: 'contratos',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.contratoRepository.findOne({where: {
          id: id,
        }});
        await this.contratoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um contrato',
          tipo: 3,
          table: 'contratos',
          fk: data.id,
          user: idUser
        });
      }

      async valorUsadoUp(contrato: number, valor: number, idUser: User){
        var data = await this.contratoRepository.findOneBy({id: contrato});
        data.valor_usado = Number(data.valor_usado) + Number(valor);
        await this.contratoRepository.update({id:data.id},{...data});
      }

      async valorUsadoDown(contrato: number, valor: number, idUser: User){
        var data = await this.contratoRepository.findOneBy({id: contrato});
        data.valor_usado = Number(data.valor_usado) - Number(valor);
        await this.contratoRepository.update({id:data.id},{...data});
      }
}
