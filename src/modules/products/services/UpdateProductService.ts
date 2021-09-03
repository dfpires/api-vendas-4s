import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";

// cria um tipo de dado
interface IRequest {
    id: string,
    name: string,
    price: number,
    quantity: number
}

// cria a classe
class UpdateProductService {
    public async execute({id, name, price, quantity}: IRequest): Promise<Product>{
        // obter o repositório de produto
        let productRepository = getCustomRepository(ProductRepository)
        let productExists = await productRepository.findOne(id)
        // verifica se ele existe
        if (!productExists){
            // lançar uma exceção
            throw new AppError('Produto não existe')
        }
        // produto tem o mesmo nome
        let productSameName = await productRepository.findByName(name)
        if (productSameName){
            throw new AppError('Produto já tem um nome deste')
        }
        // efetivamente atualizar
        productExists.name = name
        productExists.price = price
        productExists.quantity = quantity
        await productRepository.save(productExists) // como o productExists possui id, ele atualiza
        return productExists
    }
}

export default UpdateProductService