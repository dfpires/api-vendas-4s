import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import {sign} from 'jsonwebtoken'
import authConfig from '../../../config/auth'

// interface de requisição de dados
interface IRequest {
    email: string,
    password: string
}
// interface de retorna dos dados
interface IResponse {
    user: User,
    token: string
}

class SessionService {
    public async execute({email, password}: IRequest): Promise<IResponse> {
        let userRepository = getCustomRepository(UserRepository)
        let user = await userRepository.findByEmail(email)
        
        if (!user){ // usuário não existe
            throw new AppError(`Incorrect email/password combination`, 401)
        }

        // compara a senha informada com a senha do banco de dados (está em md5)
        let passwordConfirmed = await compare(password, user.password)

        if (!passwordConfirmed){ // senha não confere
            throw new AppError(`Incorrect email / password combination`, 401)
        }

        let token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        })

        return {
            user, 
            token
        }
    }
}

export default SessionService