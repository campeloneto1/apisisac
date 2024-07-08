import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PolicialFerias as PolicialFeriasEntity } from './policial-ferias.entity';
import { PolicialFerias as PolicialFeriasInterface, PoliciaisFerias as PoliciaisFeriasInterface } from './policial-ferias.interface';
import { User } from 'src/users/user.interface';
import { format } from 'date-fns';
import { LogsService } from 'src/logs/logs.service';


@Injectable()
export class PoliciaisFeriasService {
    constructor(
        @InjectRepository(PolicialFeriasEntity)
        private policialFeriasRepository: Repository<PolicialFeriasEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(params:any,idUser: User): Promise<PoliciaisFeriasInterface> {
        
          return await this.policialFeriasRepository.find({
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
  
      async find(id: number, idUser: User): Promise<PolicialFeriasInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.policialFeriasRepository.findOne({
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
  
      async create(object: PolicialFeriasInterface, idUser: User) {
        var object:PolicialFeriasInterface = this.policialFeriasRepository.create({...object, created_by: idUser}) 
        var save = await this.policialFeriasRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma Ferias de Policial',
          tipo: 1,
          table: 'policiais_ferias',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PolicialFeriasInterface, idUser: User) {
        var data: PolicialFeriasInterface = await this.policialFeriasRepository.findOneBy({id: id});
        data = {...object}
        await this.policialFeriasRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou um Ferias de Policial',
          tipo: 2,
          table: 'policiais_ferias',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.policialFeriasRepository.findOne({where: {
          id: id,
        }});
        await this.policialFeriasRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu uma Ferias de Policial',
          tipo: 3,
          table: 'policiais_ferias',
          fk: data.id,
          user: idUser
        });
      }

      async quantidade(params:any,idUser: User): Promise<number> {
        return await this.policialFeriasRepository.count({where: {
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

      async wherePolicial(id: number, idUser: User): Promise<PoliciaisFeriasInterface | null> {
        var idsSubs:any = [];
        idUser.users_subunidades.forEach((data) => {
          idsSubs.push(data.subunidade.id)
        });
        return await this.policialFeriasRepository.find({
          
          where: {
            //@ts-ignore
            policial: {
              id: id,
              setor: {
                subunidade: {
                  id: In(idsSubs)
                }
              }
            }
          }
      });
      }
}
