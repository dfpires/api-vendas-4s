import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductRepository";


// criar uma inteface -> tipo de dado
interface IRequest {
    name: string,
    price: number,
    quantity: number
}

// criar uma classe 
class CreateProductService {

    // criar um método de execução da criação do Produto
    public async execute({name, price, quantity} : IRequest): Promise<Product>{
        // recupera um repositório do produto
       let productRepository = getCustomRepository(ProductRepository);
        // verifica se o produto existe
       let productExist = await productRepository.findByName(name);
       if (productExist){
           // não podemos cadastrar
           throw new AppError('Já temos produto com este nome');
     
            // lançar uma exceção
       }
       // produto não existe
       // vamos criar
       let newProduct = productRepository.create({
           name, 
           price, 
           quantity
       })
       // vamos salvar no banco
       await productRepository.save(newProduct)
       return newProduct;
    }
}

export default CreateProductService