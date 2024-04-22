import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { ArmamentoCalibre as ArmamentoCalibreEntity } from './armamento-calibre.entity';
import { ArmamentoCalibre as ArmamentoCalibreInterface, ArmamentosCalibres as ArmamentosCalibresInterface } from './armamento-calibre.interface';

@Injectable()
export class ArmamentosCalibresService {
    constructor(
        @InjectRepository(ArmamentoCalibreEntity)
        private armamentoCalibreRepository: Repository<ArmamentoCalibreEntity>,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<ArmamentosCalibresInterface> {
        return await this.armamentoCalibreRepository.find();
      }
  
      async find(id: number): Promise<ArmamentoCalibreInterface | null> {
        return await this.armamentoCalibreRepository.findOne({where: {id: id}});
      }
  
      async create(object: ArmamentoCalibreInterface, idUser: User) {
        var object:ArmamentoCalibreInterface = this.armamentoCalibreRepository.create({...object, created_by: idUser}) 
        await this.armamentoCalibreRepository.save(object);      
      }
  
      async update(id:number, object: ArmamentoCalibreInterface, idUser: User) {
        var data: ArmamentoCalibreInterface = await this.armamentoCalibreRepository.findOneBy({id: id});
        data = {...object}
        await this.armamentoCalibreRepository.update({id:id},{...data, updated_by: idUser});
      }
  
      async remove(id: number, idUser: User) {
        return await this.armamentoCalibreRepository.delete(id);;
      }
}
