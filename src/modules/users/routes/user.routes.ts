// vamos utilizar as rotas da dependência do express
import {Router} from 'express'

import UserController from '../controllers/UserController'

// import celebrate
import {celebrate, Joi, Segments} from 'celebrate'

// cria a rota do produto
let userRouter = Router()

// cria o controlador 
let userController = new UserController()

// rota de consulta
// não tem o que tratar
userRouter.get('/', userController.index) 

// trata o erro de exigir corpo da requsição
userRouter.post('/', 
celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}),
userController.create)

export default userRouter