import ShowUsersService from '../../modules/user/services/users/show-user.service.js'
import UserType from '../../modules/user/enums/EUsers.js';
import AppError from '../errors/app-error.js';
import AppErrorTypes from '../errors/app-error-types.js';

function ensureAuthorized(requiredFeatures) {
  return async function authorize(request, _response, next) {
    const { id } = request.user || 0;

    // Cria uma instância manualmente do serviço ShowUsersService
    const showUsersService = new ShowUsersService();

    try {
      const user = await showUsersService.execute(id);
      

     console.log("---------- ensureAuthorized ------------");
     console.log(Object.values(UserType).includes(user.type))
       // Verifica se o tipo do usuário está em UserType
       if (!Object.values(UserType).includes(user.type)) {
        throw new AppError(AppErrorTypes.sessions.insufficientPrivilege, 403);
      } 
  
      return next();
    } catch (error) {
      next(error);
    }
  };
}

export default ensureAuthorized;