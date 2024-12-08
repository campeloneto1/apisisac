import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { DiariaTipo as DiariaTipoEntity } from './diaria-tipo.entity';
import {
  DiariaTipo as DiariaTipoInterface,
  DiariasTipos as DiariasTiposInterface,
} from './diaria-tipo.interface';

@Injectable()
export class DiariasTiposService {
  constructor(
    @InjectRepository(DiariaTipoEntity)
    private diariaTipoRepository: Repository<DiariaTipoEntity>,
    private logsService: LogsService,
  ) {}

  async index(): Promise<DiariasTiposInterface> {
    return await this.diariaTipoRepository.find();
  }

  async find(id: number): Promise<DiariaTipoInterface | null> {
    return await this.diariaTipoRepository.findOne({ where: { id: id } });
  }

  async create(object: DiariaTipoInterface, idUser: User) {
    const object2: DiariaTipoInterface = this.diariaTipoRepository.create({
      ...object,
      created_by: idUser,
    });
    const save = await this.diariaTipoRepository.save(object2);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um tipo de diária',
      tipo: 1,
      table: 'diarias_tipos',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: DiariaTipoInterface, idUser: User) {
    let data: DiariaTipoInterface = await this.diariaTipoRepository.findOneBy({
      id: id,
    });
    data = { ...object };
    await this.diariaTipoRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um tipo de diária',
      tipo: 2,
      table: 'diatias_tipos',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.diariaTipoRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.diariaTipoRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um tipo de diária',
      tipo: 3,
      table: 'diarias_tipos',
      fk: data.id,
      user: idUser,
    });
  }
}
