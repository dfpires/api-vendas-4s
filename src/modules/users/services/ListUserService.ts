import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";



class ListUserService {

    public async execute(): Promise<User[]> {

        let userRepository = getCustomRepository(UserRepository)
        
        let users = await userRepository.find(); // retorna todos
        
        return users;
    }
}

export default ListUserService;

