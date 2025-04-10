import { container } from 'tsyringe';
import { BAD_REQUEST, NO_CONTENT } from '../../../shared/infra/constants/http-status-code.constants.js';


import ListProductService from '../services/list-products.service.js';

class ProductsController {
 
  async list(request, response) {
    const listProductService = container.resolve(ListProductService);
    const products = await listProductService.execute();
    return response.json(products);
  }
}

export default new ProductsController();

