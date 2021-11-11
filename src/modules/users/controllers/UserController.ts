import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ShowUserService from "../services/ShowUserService";
import ListUserService from "../services/ListUserService";


export default class UserController {
    // perceba que nesta classe não existe regra de negócio
    // método para inserir o produto
    public async create(request: Request, response: Response): Promise<Response> {
        
        // recupera a informação do usuário - corpo da página
        let {name, email, password} = request.body
        // salva no BD
        let createUser = new CreateUserService();
        let newUser = await createUser.execute({
            name, 
            email,
            password
        })

        return response.json(newUser) // novo produto retornado
    }

 
    // chama o ListProductService
    public async index (request: Request, response: Response): Promise<Response>{

        let listUserService = new ListUserService()
        let users = await listUserService.execute();
        return response.json(users);
    }

    // chama o ShowProductService
    public async show (request: Request, response: Response): Promise<Response>{
        // recupera o email e a senha fornecidos pelo usuário
        let email = request.params['email']
        let password = request.params['password']
        // cria um showUserService
        let showUserService = new ShowUserService()
        // executa o execute do showUserService
        let resposta = await showUserService.execute({email, password});
        // retorna uma String
        return response.json(resposta);
    }
}