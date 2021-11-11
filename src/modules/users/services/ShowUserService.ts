import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";

// para comparar se a senha está correta, vamos utilizar o bcryptjs
import {compare} from 'bcryptjs'

// vamos criar um tipo de dado
interface ILogin {
    email: string;
    password: string;
}
class ShowUserService {
    // vai receber o email e a senha e verificar se está correto
    // se estiver correta, retorna Usuário OK, senão retorna Usuário/Senha inválidos
    // função retorna a promessa (assícrona) de devolver uma String
    public async execute( {email, password}:ILogin): Promise<String> {
        // recupera o repositório
        let userRepository = getCustomRepository(UserRepository)
        // a partir de um email, recupera o usuário
        let user = await userRepository.findByEmail(email)
        
        if (user){ // caso exista usuário com este email
            // compara a senha informado com a senha do banco de dados
            // função compare do bcrypts
            const validPassword = await compare(password, user.password)
            if (validPassword){ // senha válida
                    return "Usuário OK"
            }
            else { // senha inválida
                    return "Usuário/Senha inválidos"
            }
        }    
        else { // usuário não encontrada
            return "Usuário/Senha inválidos";
        }
    }
}

export default ShowUserService