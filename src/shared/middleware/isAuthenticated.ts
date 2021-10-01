import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppErrors";
import authConfig from '../../config/auth'

// vamos criar uma interface, que é um tipo de dados
interface ITokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    
    // obter a autorização que está dentro do cabeçalho da requisição
    let authHeaders = request.headers.authorization 

    if (!authHeaders){
        throw new AppError(`JWT Token is missing`)
    }

    // o nome da variávei que contém o token chama-se Beared
    // Beared fkdjfksdjflkjsdlkfjsdlkjflkds
    // vetor[0] = Beared vetor[1] = 54353453534
    // token conterá o 54353453534
    let [, token] = authHeaders.split(' ') 
    // vamos verificar se o token é válido

    // tratar erro
    try { // tentar verificar se o token é valido
        let decodedToken = verify(token, authConfig.jwt.secret)
        // estamos mostrando o token do usuário decodificado
        console.log(decodedToken)
        /* 
        {
            iat: 1632962410,
            exp: 1633048810,
            sub: '5aafd764-aacd-4454-b315-92ceca43af2f'
        }
        */
        // no campo sub, temos o id do usuário, que requemos passar na requisição
        const {sub} = decodedToken as ITokenPayload // agora sim conseguimos pegar apenas o campo sub

        console.log(`ID do usuário ${sub}`)

        // vamos alterar as informações da requisição - a requisição precisa conter o id do usuário, está no 
       
        request.user = {
            id: sub
        }

        return next() // deixa a API ser utilizada -> será consumida
    }
    catch { // se o token não for válido
        throw new AppError(`Invalid JWT Token`)
    }
}