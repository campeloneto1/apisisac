import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { Oficina as OficinaEntity } from './oficina.entity';
import {
  Oficina as OficinaInterface,
  Oficinas as OficinasInterface,
} from './oficina.interface';

@Injectable()
export class OficinasService {
  constructor(
    @InjectRepository(OficinaEntity)
    private oficinaRepository: Repository<OficinaEntity>,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(idUser: User): Promise<OficinasInterface> {
    if (idUser.perfil.administrador) {
      return await this.oficinaRepository.find();
    } else {
      return await this.oficinaRepository.find({
        where: {
          //@ts-ignore
          subunidade: {
            id: idUser.subunidade.id,
          },
        },
      });
    }
  }

  async find(id: number, idUser: User): Promise<OficinaInterface | null> {
    return await this.oficinaRepository.findOne({
      where: {
        id: id,
        //@ts-ignore
        subunidade: {
          id: idUser.subunidade.id,
        },
      },
    });
  }

  async create(object: OficinaInterface, idUser: User) {
    var object: OficinaInterface = this.oficinaRepository.create({
      ...object,
      subunidade: idUser.subunidade,
      created_by: idUser,
    });
    await this.oficinaRepository.save(object);
  }

  async update(id: number, object: OficinaInterface, idUser: User) {
    var data: OficinaInterface = await this.oficinaRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.oficinaRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
  }

  async remove(id: number, idUser: User) {
    return await this.oficinaRepository.delete(id);
  }
}
