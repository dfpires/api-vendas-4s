import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
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

}