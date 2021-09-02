import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";
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

        return response.json([]) // retorna nada
    }
    // chama o ListProductService
    public async index (request: Request, response: Response): Promise<Response>{

        let listProductService = new ListProductService()
        let products = await listProductService.execute();
        return response.json(products);
    }

    // chama o ShowProductService
    public async show (request: Request, response: Response): Promise<Response>{
        // id virá pela URL da requisção
        let {id} = request.params
        let showProductService = new ShowProductService()
        let product = await showProductService.execute({id});
        return response.json(product);
    }

    // chama o UpdateProductService
    public async update(request: Request, response: Response): Promise<Response>{
        // id do produto vem da URL
        let {id} = request.params
        // restante do produto vem do corpo da página
        let {name, price, quantity} = request.body

        let updateService = new UpdateProductService() 

        let product = await updateService.execute({id, name, price, quantity})
        
        return response.json(product)
    }
}