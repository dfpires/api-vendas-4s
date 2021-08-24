import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";


interface IRequest {
    id: string
}

class ShowProductService {
    // retorna apenas 1 produto, o primeiro
    public async execute({id}: IRequest): Promise<Product> {

        let productRepository = getCustomRepository(ProductRepository)
        
        let product = await productRepository.findOne(id); // retorna todos
        
        if (!product){
            throw new AppError('Produto não existe')
        }
        return product;
    }

}

export default ShowProductService;