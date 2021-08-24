import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import ProductRepository from "../typeorm/repositories/ProductRepository";


// cria um tipo de dado
interface IRequest {
    id: string // uuid -> universally unique identifier
}

// criação de classe
class DeleteProductService {

    // cria o método execute
    public async execute({id}: IRequest): Promise <void>{
        // recupera o repositório de produto
        let productRepository = getCustomRepository(ProductRepository)
        // busca pelo produto com id
        let product = await productRepository.findOne(id);
        if (!product){
            throw new AppError(`Produto não existe`)
        }
        await productRepository.remove(product);
    }
}

export default DeleteProductService