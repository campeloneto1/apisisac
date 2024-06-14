import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { PolicialPublicacao as PolicialPublicacaoEntity } from './policial-publicacao.entity';
import { PolicialPublicacao as PolicialPublicacaoInterface, PoliciaisPublicacoes as PoliciaisPublicacoesInterface } from './policial-publicacao.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PoliciaisPublicacoesService {
    constructor(
        @InjectRepository(PolicialPublicacaoEntity)
        private policialFeriasRepository: Repository<PolicialPublicacaoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<PoliciaisPublicacoesInterface> {
        if(idUser.perfil.administrador){
          return await this.policialFeriasRepository.find({
            relations: {
              policial: {
                graduacao: true
              }
            }
          });
        }else{
          return await this.policialFeriasRepository.find({
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
  
      async find(id: number, idUser: User): Promise<PolicialPublicacaoInterface | null> {
        return await this.policialFeriasRepository.findOne({
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
  
      async create(object: PolicialPublicacaoInterface, idUser: User) {
        var object:PolicialPublicacaoInterface = this.policialFeriasRepository.create({...object, created_by: idUser}) 
        var save = await this.policialFeriasRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma Publicacao de Policial',
          tipo: 1,
          table: 'policiais_publicacoes',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: PolicialPublicacaoInterface, idUser: User) {
        var data: PolicialPublicacaoInterface = await this.policialFeriasRepository.findOneBy({id: id});
        data = {...object}
        await this.policialFeriasRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma Publicacao de Policial',
          tipo: 2,
          table: 'policiais_publicacoes',
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
          mensagem: 'Excluiu uma Publicacao de Policial',
          tipo: 3,
          table: 'policiais_publicacoes',
          fk: data.id,
          user: idUser
        });
      }
}
