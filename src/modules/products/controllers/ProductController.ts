import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import Product from "../typeorm/entities/Product";


export default class ProductController {
    // perceba que nesta classe não existe regra de negócio
    // método para inserir o produto
    public async create(request: Request, response: Response): Promise<Response> {
        
        // recupera a informação do usuário - corpo da página
        let {name, price, quantity} = request.body
        // salva no BD
        let createProduct = new CreateProductService();
        let newProduct = await createProduct.execute({
            name, 
            price,
            quantity
        })

        return response.json(newProduct) // novo produto retornado
    }

    public async delete(request: Request, response: Response): Promise<Response>{

        //  recupera a informação do usuário - vem na url da requisição
        let {id} = request.params
        let deleteProductService = new DeleteProductService()
        await deleteProductService.execute({ id } )

        return response.json([])
    }
}