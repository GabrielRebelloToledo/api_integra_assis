import { container } from 'tsyringe';
import AuthenticateUsersService from '../services/authenticate-users.service.js'
import { UNAUTHORIZED } from '../../../shared/infra/constants/http-status-code.constants.js';


class SessionsController {
  async signIn(request, response) {

    
    console.log(request.body)

    const { email, password } = request.body;

    const authenticateUsersService = container.resolve( AuthenticateUsersService);

    const token = await authenticateUsersService.execute({
      email,
      password,
    });

    if(token && token.success === false){
      return response.status(UNAUTHORIZED).json({ message: token.message });
    } 

    return response.json(token);

  }
}

export default new SessionsController();

