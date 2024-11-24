import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Repository } from 'typeorm';
import { Policial as PolicialEntity } from './policial.entity';
import {
  Policial as PolicialInterface,
  Policiais as PoliciaisInterface,
} from './policial.interface';
import { User } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { LogsService } from 'src/logs/logs.service';
import { UsersSubunidadesService } from 'src/users-subunidades/users-subunidades.service';

@Injectable()
export class PoliciaisService {
  constructor(
    @InjectRepository(PolicialEntity)
    private policialRepository: Repository<PolicialEntity>,
    private usersService: UsersService,
    private usersSubunidadesService: UsersSubunidadesService,
    private utilitiesService: UtilitiesService,
    private logsService: LogsService,
  ) {}

  async index(params: any, idUser: User): Promise<PoliciaisInterface> {
    let pols: PoliciaisInterface;
    if (idUser.perfil.administrador) {
      pols = await this.policialRepository.find({
        where: {
          setor: {
            subunidade: {
              id: params.subunidade,
            },
          },
        },
        relations: {
          user: {
            policial: false,
            perfil: false,
          },
        },
      });
    } else {
      pols = await this.policialRepository.find({
        where: {
          boletim_transferencia: IsNull(),
          setor: {
            subunidade: {
              id: params.subunidade,
            },
          },
        },
        relations: {
          user: {
            policial: false,
            perfil: false,
          },
        },
      });
    }

    if (params.ativo) {
      pols = pols.filter((element) => {
        return element.boletim_transferencia === null;
      });
    }

    if (params.inativo) {
      pols = pols.filter((element) => {
        return element.inativo;
      });
    }

    return pols;
  }

  async find(id: number, idUser: User): Promise<PolicialInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialRepository.findOne({
      where: {
        id: id,
        setor: {
          subunidade: {
            id: In(idsSubs),
          },
        },
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
              modelo: true,
            },
          },
        },
        materiais_policiais: {
          policial: false,
          materiais_policiais_itens: {
            material: {
              modelo: true,
            },
          },
        },
        veiculos_policiais: {
          policial: false,
          veiculo: {
            modelo: {
              marca: true,
            },
          },
        },
      },
    });
  }

  async find2(id: number, idUser: User): Promise<PolicialInterface | null> {
    const idsSubs: any = [];
    idUser.users_subunidades.forEach((data) => {
      idsSubs.push(data.subunidade.id);
    });
    return await this.policialRepository.findOne({
      where: {
        id: id,
        //@ts-ignore
        setor: {
          subunidade: {
            id: In(idsSubs),
          },
        },
      },
    });
  }

  async create(request: PolicialInterface, idUser: User) {
    const object: PolicialInterface = this.policialRepository.create({
      ...request,
      created_by: idUser,
    });
    const policial = await this.policialRepository.save(object);

    await this.logsService.create({
      object: JSON.stringify(policial),
      mensagem: 'Cadastrou um Policial',
      tipo: 1,
      table: 'policiais',
      fk: policial.id,
      user: idUser,
    });

    const salt = await this.utilitiesService.generateSalt(10);
    const password = await this.utilitiesService.hashString(
      `${object.cpf}${salt}`,
    );
    const save = await this.policialRepository.findOne({
      relations: {
        setor: true,
      },
      where: { id: policial.id },
    });
    const user: User = {
      nome: object.nome,
      cpf: object.cpf,
      password: password,
      salt: salt,
      //@ts-ignore
      subunidade: save.setor.subunidade.id,
      policial: policial,
      //@ts-ignore
      perfil: 3,
    };
    await this.usersService.create(user, idUser);
  }

  async update(id: number, object: PolicialInterface, idUser: User) {
    let data: PolicialInterface = await this.policialRepository.findOneBy({
      id: id,
    });
    const dataold = data;
    data = { ...object };
    await this.policialRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );

    let upuser = false;
    const user = await this.usersService.wherePol2(id);
    if (user) {
      if (object.nome && user.nome != object.nome) {
        upuser = true;
        user.nome = object.nome;
      }
      if (object.cpf && user.cpf != object.cpf) {
        upuser = true;
        user.cpf = object.cpf;
      }
      if (object.telefone1 && user.telefone != object.telefone1) {
        upuser = true;
        user.telefone = object.telefone1;
      }
      if (object.email && user.email != object.email) {
        upuser = true;
        user.email = object.email;
      }

      if (upuser) {
        await this.usersService.update(user.id, user, idUser);
      }
    }

    await this.logsService.create({
      object: JSON.stringify(data),
      object_old: JSON.stringify(dataold),
      mensagem: 'Editou um Policial',
      tipo: 2,
      table: 'policiais',
      fk: id,
      user: idUser,
    });
  }

  async remove(id: number, idUser: User) {
    const del = this.policialRepository.findOne({
      where: {
        id: id,
      },
    });
    await this.logsService.create({
      object: JSON.stringify(del),
      mensagem: 'Excluiu um Policial',
      tipo: 3,
      table: 'policiais',
      fk: id,
      user: idUser,
    });
    await this.policialRepository.delete(id);
  }

  async disponiveis(params: any, idUser: User): Promise<PoliciaisInterface> {
    return await this.policialRepository.find({
      where: {
        boletim_transferencia: IsNull(),
        //@ts-ignore
        setor: {
          subunidade: {
            id: params.subunidade,
          },
        },
      },
    });
  }

  async porSetor(
    id: number,
    params: any,
    idUser: User,
  ): Promise<PoliciaisInterface> {
    return await this.policialRepository.find({
      where: {
        boletim_transferencia: IsNull(),
        setor: {
          id: id,
          subunidade: {
            id: params.subunidade,
          },
        },
      },
      order: {
        graduacao: {
          id: 'DESC',
        },
        numeral: 'ASC',
      },
    });
  }

  async getAll(params: any, idUser: User): Promise<PoliciaisInterface> {
    return await this.policialRepository.find({
      relations: {
        setor: {
          subunidade: true,
        },
      },
      where: {
        boletim_transferencia: IsNull(),
      },
    });
  }

  async setBoletimTransferencia(id: number, boletim: string, idUser: User) {
    const policial = await this.policialRepository.findOneBy({ id: id });
    policial.boletim_transferencia = boletim;
    await this.policialRepository.update(
      { id: id },
      { ...policial, updated_by: idUser },
    );
  }

  async quantidade(params: any, idUser: User): Promise<number> {
    return await this.policialRepository.count({
      where: {
        boletim_transferencia: IsNull(),
        //@ts-ignore
        setor: {
          subunidade: {
            id: params.subunidade,
          },
        },
      },
    });
  }

  async quantidadeInativos(params: any, idUser: User): Promise<number> {
    return await this.policialRepository.count({
      where: {
        boletim_transferencia: IsNull(),
        inativo: true,
        //@ts-ignore
        setor: {
          subunidade: {
            id: params.subunidade,
          },
        },
      },
    });
  }

  async updateFoto(id: number, object: any, idUser: User) {
    const data: PolicialInterface = await this.policialRepository.findOneBy({
      id: id,
    });
    const dataold = data;
    data.foto = object.foto;
    await this.policialRepository.update(
      { id: id },
      { ...data, updated_by: idUser },
    );

    await this.logsService.create({
      object: JSON.stringify(data),
      object_old: JSON.stringify(dataold),
      mensagem: 'Modificou a foto de Policial',
      tipo: 2,
      table: 'policiais',
      fk: id,
      user: idUser,
    });
  }

  async relatorio(object: any, idUser: User): Promise<PoliciaisInterface> {
    let policiais;

    policiais = await this.policialRepository.find({
      where: {
        //@ts-ignore
        setor: {
          subunidade: {
            id: object.subunidade,
          },
        },
      },
    });

    if (object.setor) {
      policiais = policiais.filter((element) => {
        return element.setor.id === object.setor;
      });
    }

    if (object.graduacao) {
      policiais = policiais.filter((element) => {
        return element.graduacao.id === object.graduacao;
      });
    }

    if (object.sexo) {
      policiais = policiais.filter((element) => {
        if (element.sexo) {
          return element.sexo.id === object.sexo;
        }
      });
    }

    if (object.transferido) {
      policiais = policiais.filter((element) => {
        return element.boletim_transferencia !== null;
      });
    } else {
      policiais = policiais.filter((element) => {
        return element.boletim_transferencia === null;
      });
    }

    if (object.inativo) {
      policiais = policiais.filter((element) => {
        return element.inativo !== null;
      });
    } else {
      policiais = policiais.filter((element) => {
        return element.inativo === null;
      });
    }

    return policiais;
  }
}
