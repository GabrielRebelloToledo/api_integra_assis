import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import User from '../../../../entities/user.entities.js'; // Sua entidade de usuário
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../../shared/infra/constants/http-status-code.constants.js';

class ListUsersService {
  constructor() {
    // Repositório do TypeORM para a entidade User
    this.userRepository = AppDataSource.getRepository(User);
  }

  async execute() {
    const user = await this.userRepository.find(
      {
        relations: ['departmentUser']
      }
    );

     if (!user) {
      throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND);
    } 

    return user;
  }


}

export default ListUsersService;
