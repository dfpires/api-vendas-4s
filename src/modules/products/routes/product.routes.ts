// vamos utilizar as rotas da dependência do express
import {Router} from 'express'

import ProductController from '../controllers/ProductController'

// import celebrate
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticated from '../../../shared/middleware/isAuthenticated'

// cria a rota do produto
let productRouter = Router()

// cria o controlador 
let productController = new ProductController()

// rota de consulta
// não tem o que tratar
productRouter.get('/', isAuthenticated, productController.index) 

// tratar a obrigatoriedade de termos um id
productRouter.get('/:id', isAuthenticated,
celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}),
productController.show)

// trata o erro de exigir corpo da requsição
productRouter.post('/', isAuthenticated,
celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required()
    }
}),
productController.create)

productRouter.delete('/:id', isAuthenticated,

celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}),
productController.delete)

productRouter.put('/:id', isAuthenticated,
celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required()
    }
}),
productController.update)

export default productRouter