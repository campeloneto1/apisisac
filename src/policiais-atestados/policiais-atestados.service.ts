import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PolicialAtestado as PolicialAtestadoEntity } from './policial-atestado.entity';
import { PolicialAtestado as PolicialAtestadoInterface, PoliciaisAtestados as PoliciaisAtestadosInterface } from './policial-atestado.interface';
import { LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { LazyModuleLoader } from '@nestjs/core';
import { User } from 'src/users/user.interface';
import { format } from 'date-fns';

@Injectable()
export class PoliciaisAtestadosService {
    constructor(
        @InjectRepository(PolicialAtestadoEntity)
        private policialAtestadoRepository: Repository<PolicialAtestadoEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<PoliciaisAtestadosInterface> {
        return await this.policialAtestadoRepository.find({
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
  
      async find(id: number, idUser: User): Promise<PolicialAtestadoInterface | null> {
        return await this.policialAtestadoRepository.findOne({where: {
          id: id,
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
  
      async create(object: PolicialAtestadoInterface, idUser: User) {
        var object:PolicialAtestadoInterface = this.policialAtestadoRepository.create({...object, created_by: idUser}) 
        await this.policialAtestadoRepository.save(object);      
      }
  
      async update(id:number, object: PolicialAtestadoInterface, idUser: User) {
        var data: PolicialAtestadoInterface = await this.policialAtestadoRepository.findOneBy({id: id});
        data = {...object}
        await this.policialAtestadoRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.policialAtestadoRepository.delete(id);;
      }

      async quantidade(idUser: User): Promise<number> {
        return await this.policialAtestadoRepository.count({where: {
          //@ts-ignore
          data_inicial: LessThanOrEqual(format(new Date(), 'yyyy-MM-dd')),
          //@ts-ignore
          data_final: MoreThanOrEqual(format(new Date(), 'yyyy-MM-dd')),
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
