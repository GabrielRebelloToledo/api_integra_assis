import { BAD_REQUEST } from '../infra/constants/http-status-code.constants.js'

export default class AppError extends Error {
   appErrorType;
   statusCode;

  constructor(appErrorType, statusCode = BAD_REQUEST) {
    super();

    this.name = `Error: ${appErrorType}`;
    this.message = this.message ? this.message : appErrorType;
    this.statusCode = statusCode;
    this.appErrorType = appErrorType;
  }
}
