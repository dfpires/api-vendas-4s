import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppErrors";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

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

class SessionUserService {
    public async execute({email, password}: IRequest): Promise<IResponse> {
        let userRepository = getCustomRepository(UserRepository)
        let user = await userRepository.findByEmail(email)
        
        if (!user){ // usuário não existe
            throw new AppError(`Incorrect email/password combination`, 401)
        }

        // compara a senha informada com a senha do banco de dados (está em md5)
        let passwordConfirmed = await compare(password, user.password)
    }
}

export default SessionUserService