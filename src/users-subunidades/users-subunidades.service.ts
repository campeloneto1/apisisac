import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { Repository } from 'typeorm';
import { UserSubunidade as UserSubunidadeEntity } from './user-subunidade.entity';
import {
  UserSubunidade as UserSubunidadeInterface,
  UsersSubunidades as UsersSubunidadesInterface,
} from './user-subunidade.interface';
import { User } from 'src/users/user.interface';

@Injectable()
export class UsersSubunidadesService {
  constructor(
    @InjectRepository(UserSubunidadeEntity)
    private usersSubunidadesRepository: Repository<UserSubunidadeEntity>,
    private logsService: LogsService,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}

  async index(): Promise<UsersSubunidadesInterface> {
    return await this.usersSubunidadesRepository.find();
  }

  async find(id: number): Promise<UserSubunidadeInterface | null> {
    return await this.usersSubunidadesRepository.findOne({ where: { id: id } });
  }

  async create(object: UserSubunidadeInterface, idUser: User) {
    var object: UserSubunidadeInterface =
      this.usersSubunidadesRepository.create({ ...object, created_by: idUser });
    var save = await this.usersSubunidadesRepository.save(object);

    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou uma subunidade do usuário',
      tipo: 1,
      table: 'users_subunidades',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: UserSubunidadeInterface, idUser: User) {
    var data: UserSubunidadeInterface =
      await this.usersSubunidadesRepository.findOneBy({ id: id });
    data = { ...object };
    await this.usersSubunidadesRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou uma subunidade de um usuário',
      tipo: 2,
      table: 'users_subunidades',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    var data = await this.usersSubunidadesRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.usersSubunidadesRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu uma subunidade de um usuário',
      tipo: 3,
      table: 'users_subunidades',
      fk: data.id,
      user: idUser,
    });
  }
}
