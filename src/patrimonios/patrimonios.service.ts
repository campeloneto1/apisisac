import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { IsNull, Repository } from 'typeorm';
import { Patrimonio as PatrimonioEntity } from './patrimonio.entity';
import { Patrimonio as PatrimonioInterface, Patrimonios as PatrimoniosInterface } from './patrimonio.interface';

@Injectable()
export class PatrimoniosService {
    constructor(
        @InjectRepository(PatrimonioEntity)
        private patrimonioRepository: Repository<PatrimonioEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(idUser: User): Promise<PatrimoniosInterface> {
        return await this.patrimonioRepository.find({
          where: {
            //@ts-ignore
            setor: {
                subunidade: {
                    id: idUser.subunidade.id
                  }
            }
          }
        });
      }
  
      async find(id: number, idUser: User): Promise<PatrimonioInterface | null> {
        return await this.patrimonioRepository.findOne({where: {
          id: id,
          //@ts-ignore
          setor: {
            subunidade: {
                id: idUser.subunidade.id
              }
        }
        }});
      }
  
      async create(object: PatrimonioInterface, idUser: User) {
        var object:PatrimonioInterface = this.patrimonioRepository.create({...object, created_by: idUser}) 
        await this.patrimonioRepository.save(object);      
      }
  
      async update(id:number, object: PatrimonioInterface, idUser: User) {
        var data: PatrimonioInterface = await this.patrimonioRepository.findOneBy({id: id});
        data = {...object}
        await this.patrimonioRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.patrimonioRepository.delete(id);;
      }

      async disponiveis(idUser: User): Promise<PatrimoniosInterface> {
        return await this.patrimonioRepository.find({where: {
          data_baixa: IsNull(),
          //@ts-ignore
          setor: {
            subunidade: {
                id: idUser.subunidade.id
            }
          }
        }});
      }
}
