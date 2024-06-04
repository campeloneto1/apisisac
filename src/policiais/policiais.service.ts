import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Policial as PolicialEntity } from './policial.entity';
import {
  Policial as PolicialInterface,
  Policiais as PoliciaisInterface,
} from './policial.interface';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { LogsService } from 'src/logs/logs.service';

@Injectable()
export class PoliciaisService {
  constructor(
    @InjectRepository(PolicialEntity)
    private policialRepository: Repository<PolicialEntity>,
    private lazyModuleLoader: LazyModuleLoader,
    private usersService: UsersService,
    private utilitiesService: UtilitiesService,
    private logsService: LogsService
  ) {}

  async index(idUser: User): Promise<PoliciaisInterface> {

    if (idUser.perfil.administrador) {
      return await this.policialRepository.find({
        relations: {
          user: {
           policial: false,
            perfil: false
          },
          
        }
      });
    } else {
      return await this.policialRepository.find({
        where:{
          //@ts-ignore
          setor: {
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        },
        relations: {
          user: {
           policial: false,
            perfil: false
          },
          
        }
      });
    }
  }

  async find(id: number, idUser: User): Promise<PolicialInterface | null> {
    return await this.policialRepository.findOne({
      where: { 
        id: id,
        //@ts-ignore
        setor: {
          subunidade: {
            id: idUser.subunidade.id
          }
        }
       },
      relations: {
        policiais_publicacoes: { policial: false },
        policiais_cursos: { policial: false },
        policiais_ferias: { policial: false },
        policiais_atestados: { policial: false },
        armamentos_emprestimos: { 
          policial: false,
          armamentos_emprestimos_itens: {
            armamento: {
              modelo: true
            }
          }
        },
        materiais_policiais: { 
          policial: false,
          materiais_policiais_itens: {
            material: {
              modelo: true
            }
          }
        },
        veiculos_policiais: {
          policial: false,
          veiculo: {
            modelo: {
              marca: true
            }
          }
        }
      },
    });
  }

  async find2(id: number, idUser: User): Promise<PolicialInterface | null> {
    return await this.policialRepository.findOne({
      where: { 
        id: id,
        //@ts-ignore
        setor: {
          subunidade: {
            id: idUser.subunidade.id
          }
        }
       },
    });
  }

  async create(object: PolicialInterface, idUser: User) {
    var object: PolicialInterface = this.policialRepository.create({
      ...object,
      created_by: idUser,
    });
    var policial = await this.policialRepository.save(object);

    await this.logsService.create({
      object: JSON.stringify(policial),
      mensagem: 'Cadastrou um Policial',
      tipo: 1,
      table: 'policiais',
      fk: policial.id,
      user: idUser
    });

    var salt = await this.utilitiesService.generateSalt(10);
    var password = await this.utilitiesService.hashString(`${object.cpf}${salt}`);
    var save = await this.policialRepository.findOne({relations: {
      setor: true,
    },where: {id: policial.id}});
    var user: User = {
        nome: object.nome,
        cpf: object.cpf,
        password: password,
        salt: salt,
        //@ts-ignore
        subunidade: save.setor.subunidade.id,
        policial: policial,
        //@ts-ignore
        perfil: 3
    }
    await this.usersService.create(user, idUser);
  }

  async update(id: number, object: PolicialInterface, idUser: User) {
    var data: PolicialInterface = await this.policialRepository.findOneBy({
      id: id,
    });
    var dataold = data;
    data = { ...object };
    await this.policialRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );

    var user = await this.usersService.wherePol(id);

    user.nome = data.nome;
    user.cpf = data.cpf;
    if(data.telefone1 && user.telefone != data.telefone1){
      user.telefone = data.telefone1;
    }
    if(data.email && user.email != data.email){
      user.email = data.email;
    }
    await this.usersService.update(user.id, user, idUser);

    await this.logsService.create({
      object: JSON.stringify(data),
      object_old: JSON.stringify(dataold),
      mensagem: 'Editou um Policial',
      tipo: 2,
      table: 'policiais',
      fk: id,
      user: idUser
    });
  }

  async remove(id: number, idUser: User) {
    var del = this.policialRepository.findOne({
      where: { 
        id: id,
       }
    });
    await this.logsService.create({
      object: JSON.stringify(del),
      mensagem: 'Excluiu um Policial',
      tipo: 3,
      table: 'policiais',
      fk: id,
      user: idUser
    });
    await this.policialRepository.delete(id);
  }

  async disponiveis(idUser: User): Promise<PoliciaisInterface> {
    if(idUser.perfil.administrador){
      return await this.policialRepository.find({
        where: { 
          boletim_transferencia: IsNull(),
        },
      });
    }else{
      return await this.policialRepository.find({
        where: { 
          boletim_transferencia: IsNull(),
          //@ts-ignore
          setor: {
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        },
      });
    }
  }

  async quantidade(idUser: User): Promise<number> {
    return await this.policialRepository.count({
      where: { 
        boletim_transferencia: IsNull(),
        //@ts-ignore
        setor: {
          subunidade: {
            id: idUser.subunidade.id
          }
        }
      },
    });
  }

  async relatorio(object:any, idUser: User): Promise<PoliciaisInterface> {
    var policiais;
    if(idUser.perfil.administrador){
      policiais = await this.policialRepository.find();
    }else{
      policiais = await this.policialRepository.find({
        where: { 
          //@ts-ignore
          setor: {
            subunidade: {
              id: idUser.subunidade.id
            }
          }
        },
      });
    }

    if(object.setor){
      policiais = policiais.filter(element => {
        return element.setor.id === object.setor;
      })
    }

    if(object.graduacao){
      policiais = policiais.filter(element => {
        return element.graduacao.id === object.graduacao;
      })
    }

    if(object.sexo){
      policiais = policiais.filter(element => {
        if(element.sexo){
          return element.sexo.id === object.sexo;
        }
        
      })
    }

    if(object.transferido){
      policiais = policiais.filter(element => {
        return element.boletim_transferencia !== null;
      })
    }

    return policiais;
  }
}
