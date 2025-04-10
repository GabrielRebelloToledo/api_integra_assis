import express from 'express';
import ProductsControllerController from '../controllers/products.controller.js';
import ensureAuthenticated from '../../../shared/middlewares/ensure-authenticated.middleware.js'
import ensureAuthorized from '../../../shared/middlewares/ensure-authorized.middleware.js'
import UserType from '../../user/enums/EUsers.js';

const productsRoutes = express.Router();

productsRoutes.get('/list', 
    /* ensureAuthenticated,
    ensureAuthorized([UserType.ADMIN]), */ 
    ProductsControllerController.list);

export default productsRoutes;