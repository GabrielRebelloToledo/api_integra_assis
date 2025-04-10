import express from 'express';
import ConectionTokenController from '../controllers/conection-token.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const conectionAppRoutes = express.Router();
conectionAppRoutes.post(
    '/', 
     /* ensureAuthenticated,
     ensureAuthorized([UserType.ADMIN]), */
     ConectionTokenController.create

);

conectionAppRoutes.post(
    '/integrar', 
     /* ensureAuthenticated,
     ensureAuthorized([UserType.ADMIN]), */
     ConectionTokenController.create

);


export default conectionAppRoutes;