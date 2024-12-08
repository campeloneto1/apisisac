import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogsService } from 'src/logs/logs.service';
import { User } from 'src/users/user.interface';
import { Repository } from 'typeorm';
import { DiariaStatus as DiariaStatusEntity } from './diaria-status.entity';
import {
  DiariasStatus as DiariasStatusInterface,
  DiariaStatus as DiariaStatusInterface,
} from './diaria-status.interface';

@Injectable()
export class DiariasStatusService {
  constructor(
    @InjectRepository(DiariaStatusEntity)
    private diariaRepository: Repository<DiariaStatusEntity>,
    private logsService: LogsService,
  ) {}

  async index(): Promise<DiariasStatusInterface> {
    return await this.diariaRepository.find();
  }

  async find(id: number): Promise<DiariaStatusInterface | null> {
    return await this.diariaRepository.findOne({ where: { id: id } });
  }

  async create(object: DiariaStatusInterface, idUser: User) {
    const object2: DiariaStatusInterface = this.diariaRepository.create({
      ...object,
      created_by: idUser,
    });
    const save = await this.diariaRepository.save(object2);
    await this.logsService.create({
      object: JSON.stringify(save),
      mensagem: 'Cadastrou um status de diária',
      tipo: 1,
      table: 'diarias_status',
      fk: save.id,
      user: idUser,
    });
  }

  async update(id: number, object: DiariaStatusInterface, idUser: User) {
    let data: DiariaStatusInterface = await this.diariaRepository.findOneBy({ id: id });
    data = { ...object };
    await this.diariaRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );
    await this.logsService.create({
      object: JSON.stringify(object),
      object_old: JSON.stringify(data),
      mensagem: 'Editou um status de diária',
      tipo: 2,
      table: 'diatias_status',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const data = await this.diariaRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.diariaRepository.delete(id);
    await this.logsService.create({
      object: JSON.stringify(data),
      mensagem: 'Excluiu um status de diária',
      tipo: 3,
      table: 'diarias_status',
      fk: data.id,
      user: idUser,
    });
  }
}
