import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";



class ListProductService {

    public async execute(): Promise<Product[]> {

        let productRepository = getCustomRepository(ProductRepository)
        
        let products = await productRepository.find(); // retorna todos
        
        return products;
    }
}

export default ListProductService;

