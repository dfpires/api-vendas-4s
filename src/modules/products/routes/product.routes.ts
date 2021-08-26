// vamos utilizar as rotas da dependência do express
import {Router} from 'express'

import ProductController from '../controllers/ProductController'

// cria a rota do produto
let productRouter = Router()

// cria o controlador 
let productController = new ProductController()

// rota de consulta
productRouter.get('/', productController.index)
productRouter.get('/:id', productController.show)
productRouter.post('/', productController.create)
productRouter.delete('/:id', productController.delete)
productRouter.put('/:id', productController.update)

export default productRouter