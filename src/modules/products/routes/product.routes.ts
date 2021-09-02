// vamos utilizar as rotas da dependência do express
import {Router} from 'express'

import ProductController from '../controllers/ProductController'

// import celebrate
import {celebrate, Joi, Segments} from 'celebrate'

// cria a rota do produto
let productRouter = Router()

// cria o controlador 
let productController = new ProductController()

// rota de consulta
// não tem o que tratar
productRouter.get('/', productController.index) 

// tratar a obrigatoriedade de termos um id
productRouter.get('/:id', 
celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}),
productController.show)

productRouter.post('/', productController.create)
productRouter.delete('/:id', productController.delete)
productRouter.put('/:id', productController.update)

export default productRouter