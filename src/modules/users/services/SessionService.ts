import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import {sign} from 'jsonwebtoken'

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

        let token = sign({}, '574911d7c7b787c217319ea068a230f8', {
            subject: user.id,
            expiresIn: '1d'
        })

        return {
            user, 
            token
        }
    }
}

export default SessionService