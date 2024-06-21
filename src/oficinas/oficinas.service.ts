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
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class OficinasService {
  constructor(
    @InjectRepository(OficinaEntity)
    private oficinaRepository: Repository<OficinaEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(params:any,idUser: User): Promise<OficinasInterface> {
    
      return await this.oficinaRepository.find();
    
  }

  async find(id: number, idUser: User): Promise<OficinaInterface | null> {
    return await this.oficinaRepository.findOne({
      where: {
        id: id,
        
      },
    });
  }

  async create(object: OficinaInterface, idUser: User) {
    var object: OficinaInterface = this.oficinaRepository.create({
      ...object,
      created_by: idUser,
    });
    var save = await this.oficinaRepository.save(object);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma oficina',
      tipo: 1,
      table: 'oficinas',
      fk: save.id,
      user: idUser
    });
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
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma oficina',
      tipo: 2,
      table: 'oficinas',
      fk: id,
      user: idUser
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.oficinaRepository.findOne({where: {
      id: id,
    }});
    await this.oficinaRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma oficina',
      tipo: 3,
      table: 'oficinas',
      fk: data.id,
      user: idUser
    });
  }
}
