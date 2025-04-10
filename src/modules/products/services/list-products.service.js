import AppDataSource from '../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import AppError from '../../../shared/errors/app-error.js'; // Classe personalizada de erro
import Products from '../../../entities/tgfpro.entities.js';  // Sua entidade de usuário
import AppErrorTypes from '../../../shared/errors/app-error-types.js';
import { NOT_FOUND } from '../../../shared/infra/constants/http-status-code.constants.js';

class ListProductsService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.productsRepository = AppDataSource.getRepository(Products);
    }

     async execute() {
        const user = await this.productsRepository.find();
    
        if (!user) {
          throw new AppError(AppErrorTypes.users.notFound, NOT_FOUND);
        }
    
        return user;
      }

   
}

export default ListProductsService;
