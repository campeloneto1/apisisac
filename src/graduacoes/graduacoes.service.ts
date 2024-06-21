import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Graduacao as GraduacaoEntity } from './graduacao.entity';
import { Graduacao as GraduacaoInterface, Graduacoes as GraduacoesInterface } from './graduacao.interface';
import { User } from 'src/users/user.interface';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class GraduacoesService {
    constructor(
        @InjectRepository(GraduacaoEntity)
        private graduacaoRepository: Repository<GraduacaoEntity>,
        private logsService: LogsService,
        private lazyModuleLoader: LazyModuleLoader
    ){}

    async index(): Promise<GraduacoesInterface> {
        return await this.graduacaoRepository.find();
      }
  
      async find(id: number): Promise<GraduacaoInterface | null> {
        return await this.graduacaoRepository.findOne({where: {id: id}});
      }
  
      async create(object: GraduacaoInterface, idUser: User) {
        var object:GraduacaoInterface = this.graduacaoRepository.create({...object, created_by: idUser}) 
        var save = await this.graduacaoRepository.save(object);      
        await this.logsService.create({
          object: JSON.stringify(save),
          mensagem: 'Cadastrou uma graduação',
          tipo: 1,
          table: 'graduacoes',
          fk: save.id,
          user: idUser
        });
      }
  
      async update(id:number, object: GraduacaoInterface, idUser: User) {
        var data: GraduacaoInterface = await this.graduacaoRepository.findOneBy({id: id});
        data = {...object}
        await this.graduacaoRepository.update({id:id},{...data, updated_by: idUser});
        await this.logsService.create({
          object: JSON.stringify(object),
          object_old: JSON.stringify(data),
          mensagem: 'Editou uma graduação',
          tipo: 2,
          table: 'graduacoes',
          fk: id,
          user: idUser
        });
      }
  
      async remove(id: number, idUser: User) {
        var data = await this.graduacaoRepository.findOne({where: {
          id: id,
        }});
        await this.graduacaoRepository.delete(id);
        await this.logsService.create({
          object: JSON.stringify(data),
          mensagem: 'Excluiu uma graduação',
          tipo: 3,
          table: 'graduacoes',
          fk: data.id,
          user: idUser
        });
      }

      async policiaisGraduacoes(params: any, idUser: User):Promise<any>{
        return await this.graduacaoRepository
          .query(`
            SELECT graduacoes.nome, count(policiais.id) as quantidade
            FROM graduacoes
            LEFT JOIN policiais ON graduacoes.id = policiais.graduacaoId
            LEFT JOIN setores ON setores.id = policiais.setorId
            WHERE policiais.boletim_transferencia IS NULL
            AND setores.subunidadeId = ${params.subunidade}
            GROUP BY graduacoes.nome
            ORDER BY graduacoes.id DESC
          `);
      }
}
