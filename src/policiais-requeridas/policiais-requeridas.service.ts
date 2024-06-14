import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { IsNull, Repository } from 'typeorm';
import { PolicialRequerida as PolicialRequeridaEntity } from './policial-requerida.entity';
import { PolicialRequerida as PolicialRequeridaInterface, PoliciaisRequeridas as PoliciaisRequeridasInterface  } from './policial-requerida.interface';

@Injectable()
export class PoliciaisRequeridasService {
    constructor(
        @InjectRepository(PolicialRequeridaEntity)
        private policialRequeridaRepository: Repository<PolicialRequeridaEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<PoliciaisRequeridasInterface> {
        if(idUser.perfil.administrador){
          return await this.policialRequeridaRepository.find({
            relations: {
              policial: {
                graduacao: true
              }
            }
          });
        }else{
          return await this.policialRequeridaRepository.find({
            relations: {
              policial: {
                graduacao: true
              }
            },
            where: {
              //@ts-ignore
              policial: {
                setor: {
                  subunidade: {
                    id: idUser.subunidade.id
                  }
                }
              }
            }
          });
        }
      }
  
      async find(id: number, idUser: User): Promise<PolicialRequeridaInterface | null> {
        return await this.policialRequeridaRepository.findOne({
          relations: {
            policial: {
              graduacao: true
            }
          },
          where: {
            id: id,
            //@ts-ignore
            policial: {
              setor: {
                subunidade: {
                  id: idUser.subunidade.id
                }
              }
            }
          }
        });
      }
  
      async create(object: PolicialRequeridaInterface, idUser: User) {
        var object:PolicialRequeridaInterface = this.policialRequeridaRepository.create({...object, created_by: idUser}) 
        var save = await this.policialRequeridaRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma Requerida de Policial',
          tipo: 1,
          table: 'policiais_requeridas',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PolicialRequeridaInterface, idUser: User) {
        var data: PolicialRequeridaInterface = await this.policialRequeridaRepository.findOneBy({id: id});
        data = {...object}
        await this.policialRequeridaRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma requerida de Policial',
          tipo: 2,
          table: 'policiais_requeridas',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.policialRequeridaRepository.findOne({where: {
          id: id,
        }});
        await this.policialRequeridaRepository.delete(id);

        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu uma requerida de Policial',
          tipo: 3,
          table: 'policiais_requeridas',
          fk: data.id,
          user: idUser
        });
      }

      async quantidade(idUser: User): Promise<number> {
        return await this.policialRequeridaRepository.count({where: {
          //@ts-ignore
          boletim_publicacao: IsNull(),
          //@ts-ignore
          policial: {
            setor: {
              subunidade: {
                id: idUser.subunidade.id
              }
            }
          }
        }});
      }
}
