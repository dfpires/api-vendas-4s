import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import SessionUserService from "../services/SessionUserService";

export default class SessionUserController {
    // perceba que nesta classe não existe regra de negócio
    // método para inserir o produto
    public async create(request: Request, response: Response): Promise<Response> {
        
        // recupera a informação do usuário - corpo da página
        let {email, password} = request.body
        // gerar um token para o usuário
        let sessionUser = new SessionUserService();
        let user = await sessionUser.execute({
            email,
            password
        })

        return response.json(user) // novo produto retornado
    }


}