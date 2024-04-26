import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PolicialFerias as PolicialFeriasEntity } from './policial-ferias.entity';
import { PolicialFerias as PolicialFeriasInterface, PoliciaisFerias as PoliciaisFeriasInterface } from './policial-ferias.interface';
import { User } from 'src/users/user.interface';
import { format } from 'date-fns';


@Injectable()
export class PoliciaisFeriasService {
    constructor(
        @InjectRepository(PolicialFeriasEntity)
        private policialFeriasRepository: Repository<PolicialFeriasEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<PoliciaisFeriasInterface> {
        return await this.policialFeriasRepository.find({
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
  
      async find(id: number, idUser: User): Promise<PolicialFeriasInterface | null> {
        return await this.policialFeriasRepository.findOne({where: {
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
  
      async create(object: PolicialFeriasInterface, idUser: User) {
        var object:PolicialFeriasInterface = this.policialFeriasRepository.create({...object, created_by: idUser}) 
        await this.policialFeriasRepository.save(object);      
      }
  
      async update(id:number, object: PolicialFeriasInterface, idUser: User) {
        var data: PolicialFeriasInterface = await this.policialFeriasRepository.findOneBy({id: id});
        data = {...object}
        await this.policialFeriasRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.policialFeriasRepository.delete(id);;
      }

      async quantidade(idUser: User): Promise<number> {
        return await this.policialFeriasRepository.count({where: {
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
