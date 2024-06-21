import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicialAtestado as PolicialAtestadoEntity } from './policial-atestado.entity';
import { PolicialAtestado as PolicialAtestadoInterface, PoliciaisAtestados as PoliciaisAtestadosInterface } from './policial-atestado.interface';
import { In, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';
import { format } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PoliciaisAtestadosService {
    constructor(
        @InjectRepository(PolicialAtestadoEntity)
        private policialAtestadoRepository: Repository<PolicialAtestadoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any,idUser: User): Promise<PoliciaisAtestadosInterface> {
      
          return await this.policialAtestadoRepository.find({
            relations: {
              policial: {
                graduacao: true,
                setor: {
                  subunidade: {
                    unidade: true
                  }
                }
              }
            },
            where: {
              //@ts-ignore
              policial: {
                setor: {
                  subunidade: {
                    id: params.subunidade
                  }
                }
              }
            }
          });
        
      }
  
      async find(id: number, idUser: User): Promise<PolicialAtestadoInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.policialAtestadoRepository.findOne(
          {
            relations: {
              policial: {
                graduacao: true,
                setor: {
                  subunidade: {
                    unidade: true
                  }
                }
              }
            },
            where: {
              id: id,
              //@ts-ignore
              policial: {
                setor: {
                  subunidade: {
                    id: In(idsSubs)
                  }
                }
              }
            }
          });
      }
  
      async create(object: PolicialAtestadoInterface, idUser: User) {
        var object:PolicialAtestadoInterface = this.policialAtestadoRepository.create({...object, created_by: idUser}) 
        var save = await this.policialAtestadoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou um Atestado de Policial',
          tipo: 1,
          table: 'policiais_atestados',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PolicialAtestadoInterface, idUser: User) {
        var data: PolicialAtestadoInterface = await this.policialAtestadoRepository.findOneBy({id: id});
        data = {...object}
        await this.policialAtestadoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um Atestado de Policial',
          tipo: 2,
          table: 'policiais_atestados',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.policialAtestadoRepository.findOne({where: {
          id: id,
        }});
        await this.policialAtestadoRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu um Atestado de Policial',
          tipo: 3,
          table: 'policiais_atestados',
          fk: data.id,
          user: idUser
        });
      }

      async quantidade(params:any,idUser: User): Promise<number> {
        return await this.policialAtestadoRepository.count({where: {
          //@ts-ignore
          data_inicial: LessThanOrEqual(format(new Date(), 'yyyy-MM-dd')),
          //@ts-ignore
          data_final: MoreThanOrEqual(format(new Date(), 'yyyy-MM-dd')),
          //@ts-ignore
          policial: {
            setor: {
              subunidade: {
                id: params.subunidade
              }
            }
          }
        }});
      }
}
