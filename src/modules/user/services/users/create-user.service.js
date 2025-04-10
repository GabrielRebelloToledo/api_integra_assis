import AppDataSource from '../../../../shared/infra/environments/environments.js';  // Importa a conexão do banco
import User from '../../../../entities/user.entities.js';
import AppErrorTypes from '../../../../shared/errors/app-error-types.js';
import AppError from '../../../../shared/errors/app-error.js'; // Classe personalizada de erro
import { CONFLICT } from '../../../../shared/infra/constants/http-status-code.constants.js';
import HashProvider from '../../../../shared/providers/bcrypt-hash.provider.js';
const hashProvider = new HashProvider();


class CreateUsersService {
    constructor() {
        // Repositório do TypeORM para a entidade User
        this.userRepository = AppDataSource.getRepository(User);
      }
    
      async execute({ name, email, password, type, active,telephone,department }) {
        // Verificar se o usuário já existe
         const userExists = await this.userRepository.findOneBy({ email });
    
         if (userExists) {
         // throw new AppError(AppErrorTypes.users.emailAlreadyInUse, CONFLICT);
          return { success: false, message: new AppError(AppErrorTypes.users.emailAlreadyInUse, CONFLICT) };
        }
    
        // Criptografar a senha (simulação de hash)
        const hashedPassword = await hashProvider.generateHash(password);
    
    
        // Criar o novo usuário
        const user = this.userRepository.create({
          name,
          email,
          password: hashedPassword,
          type,
          active,
          telephone,
          department
        });
    
        // Salvar no banco
        await this.userRepository.save(user);
    
        // Retornar o usuário sem a senha
        const { password: _, ...sanitizedUser } = user;
        return sanitizedUser;
      }
}

export default CreateUsersService;
