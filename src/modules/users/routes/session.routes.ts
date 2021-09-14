// vamos utilizar as rotas da dependência do express
import {Router} from 'express'

import SessionController from '../controllers/SessionController'

// import celebrate
import {celebrate, Joi, Segments} from 'celebrate'

// cria a rota do produto
let sessionUserRouter = Router()

// cria o controlador 
let sessionController = new SessionController()

// trata o erro de exigir corpo da requsição
sessionUserRouter.post('/', 
celebrate({
    [Segments.BODY]: {
        email: Joi.string().required(),
        password: Joi.string().required()
    }
}),
sessionController.create)

export default sessionUserRouter