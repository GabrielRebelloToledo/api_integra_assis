import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';

import ConectionTokenService from '../services/auth/conection-service-token.service.js';


class ConectionTokenController {
  async create(request, response) {

    const conection = container.resolve(ConectionTokenService);
    const registro = await conection.execute();
    return response.json(registro.status);
  }
}

export default new ConectionTokenController();

