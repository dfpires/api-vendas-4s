import { Request, Response } from "express";
import SessionService from "../services/SessionService";

export default class SessionController {
    // perceba que nesta classe não existe regra de negócio
    // método para inserir o produto
    public async create(request: Request, response: Response): Promise<Response> {
        
        // recupera a informação do usuário - corpo da página
        let {email, password} = request.body
        // gerar um token para o usuário
        let session = new SessionService();
        let user = await session.execute({
            email,
            password
        })

        return response.json(user) // novo produto retornado
    }


}