import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "../errors/AppErrors";
import authConfig from '../../config/auth'

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
        return next() // deixa a API ser utilizada -> será consumida
    }
    catch { // se o token não for válido
        throw new AppError(`Invalid JWT Token`)
    }
}