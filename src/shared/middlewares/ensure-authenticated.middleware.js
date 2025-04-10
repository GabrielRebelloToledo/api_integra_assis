import jwt from 'jsonwebtoken';
const { verify } = jwt;
import authConfig from '../../config/auth.config.js'; 
import AppError from '../errors/app-error.js';
import AppErrorTypes from '../errors/app-error-types.js';
import { UNAUTHORIZED } from '../infra/constants/http-status-code.constants.js';

function ensureAuthenticated(request, _response, next) {
  const token = request.headers.authorization;

  console.log(token)

  if (!token) {
    throw new AppError(AppErrorTypes.sessions.tokenNotFound, UNAUTHORIZED);
  } 

  const sanitizedToken = token.split(' ')[1];

  try {
    const decoded = verify(sanitizedToken, authConfig.jwt.secret);

    if (!decoded || !decoded.id) {
      throw new Error();
    }

    request.user = {
      id: decoded.id,
    };

    return next();
  } catch (error) {
    throw new AppError(AppErrorTypes.sessions.invalidToken, UNAUTHORIZED);
  }
}


export default ensureAuthenticated;