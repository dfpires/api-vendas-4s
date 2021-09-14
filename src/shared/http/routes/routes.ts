
// importa classe Router da dependência express
import {Router} from 'express'
import productRouter from '../../../modules/products/routes/product.routes'
import userRouter from '../../../modules/users/routes/user.routes'
import sessionRouter from '../../../modules/users/routes/session.routes'


// cria um objeto da classe Router

let routes = Router()

routes.use('/products', productRouter)
routes.use('/users', userRouter)
routes.use('/session', sessionRouter)

// exporta o objeto para uso em outro arquivo
export default routes;

