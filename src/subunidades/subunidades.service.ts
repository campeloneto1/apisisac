import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subunidade as SubunidadeEntity } from './subunidade.entity';
import { Subunidade as SubunidadeInterface, Subunidades as SubunidadesInterface } from './subunidade.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class SubunidadesService {
    constructor(
        @InjectRepository(SubunidadeEntity)
        private subunidadeRepository: Repository<SubunidadeEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<SubunidadesInterface> {
        return await this.subunidadeRepository.find({relations: {
          comandante: {
            setor:false,
          },
          subcomandante: {
            setor: false,
          }
        }});
      }
  
      async find(id: number): Promise<SubunidadeInterface | null> {
        return await this.subunidadeRepository.findOne({where: {id: id}, relations: {
          comandante: {
            setor:false,
          },
          subcomandante: {
            setor: false,
          }
        }});
      }
  
      async create(object: SubunidadeInterface, idUser: User) {
        var object:SubunidadeInterface = this.subunidadeRepository.create({...object, created_by: idUser}) 
        await this.subunidadeRepository.save(object);      
      }
  
      async update(id:number, object: SubunidadeInterface, idUser: User) {
        var data: SubunidadeInterface = await this.subunidadeRepository.findOneBy({id: id});
        data = {...object}
        await this.subunidadeRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.subunidadeRepository.delete(id);
      }

      async whereUnidade(id: number): Promise<SubunidadesInterface | null> {
        return await this.subunidadeRepository.find({
          where: {
            unidade: {
              id: id,
            },
          },
        });
      }
}
