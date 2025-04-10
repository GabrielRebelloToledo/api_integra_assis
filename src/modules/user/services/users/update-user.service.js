import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import User from '../../../../entities/user.entities.js'; // Sua entidade de usuário
import HashProvider from '../../../../shared/providers/bcrypt-hash.provider.js';
import ShowUsersService from './show-user.service.js';

import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';


const show = new ShowUsersService();
const hashProvider = new HashProvider();

class UpdateUsersService {
  constructor() {
    // Repositório do TypeORM para a entidade User
    this.userRepository = AppDataSource.getRepository(User);
  }

  async execute(users) {
    console.log("users")
    console.log(users)

    const user = await this.getUserById(users.id);



    if (!user) {
      return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
    }

    if (users.name) {
      console.log("Atualizando nome para:", users.name);
      this.updateName(user, users.name);
    }

    if (users.email) {
      console.log("Atualizando email para:", users.email);
      const email = await this.updateEmail(user, users.email);
      if (email.success == false) {
        return { success: false, message: new AppError(AppErrorTypes.users.emailAlreadyInUse, CONFLICT) };
      }
    }

    if (users.password) {
      console.log("Atualizando senha");
      await this.updatePassword(user, users.password);
    }

    if (users.type) {
      console.log("Atualizando Grupo");
      await this.updateType(user, users.type);
    }

    if (users.active) {
      console.log("Atualizando Ativo");
      await this.updateActive(user, users.active);
    }
    if (users.telephone) {
      console.log("Atualizando Telefone");
      await this.updateTelephone(user, users.telephone);
    }

    if (users.department) {
      console.log("Atualizando Departamento");
      await this.updateDepartment(user, users.department);
    }
    // Salva e retorna o usuário atualizado
    return await this.userRepository.save(user);
  }

  async updateEmail(user, email) {
    console.log("Verificando email", email);

    // Verifica se o email passado é o mesmo já cadastrado
    if (user.email === email) {
      console.log("O email é o mesmo, nenhuma atualização necessária.");
      return { success: true, message: "O email já está cadastrado no usuário." };
    }

    // Verifica se o novo email já está em uso por outro usuário
    const userWithEmail = await this.userRepository.findOne({
      where: { email },
    });

    if (userWithEmail) {
      console.log("Conflito de email detectado");
      return { success: false, message: "Email já está em uso por outro usuário." };
    }

    // Atualiza o email do usuário
    user.email = email;
    return { success: true, message: "Email atualizado com sucesso." };
  }

  updateName(user, name) {
    console.log("Verificando nome", name);
    if (user.name !== name) {
      user.name = name;
    }
  }

  async updatePassword(user, password) {
    console.log("Gerando senha criptografada...");
    const encryptedPassword = await hashProvider.generateHash(password);
    user.password = encryptedPassword;
  }

  async updateType(user, type) {
    console.log("Verificando Tipo", type);
    if (user.type !== type) {
      user.type = type;
    }
  }

  async updateActive(user, active) {
    console.log("Verificando Ativo", active);
    if (user.active !== active) {
      user.active = active;
    }
  }



  async updateTelephone(user, telephone) {
    console.log("Verificando Telefone", telephone);
    if (user.telephone !== telephone) {
      user.telephone = telephone;
    }
  }


  async updateDepartment(user, department) {
    console.log("Verificando Departamento", department);
    if (user.department !== department) {
      user.department = department;
    }
  }


  

  async getUserById(id) {
    console.log("Buscando usuário por id:", id);  // Verifique o id usado na consulta
    const user = await show.execute(id);

    if (!user) {
      return { success: false, message: new AppError(AppErrorTypes.users.notFound, NOT_FOUND) };
    } else {
      return user;
    }
  }
}

export default UpdateUsersService;
