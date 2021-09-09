
// importa classe Router da dependência express
import {Router} from 'express'
import productRouter from '../../../modules/products/routes/product.routes'
import userRouter from '../../../modules/users/routes/user.routes'


// cria um objeto da classe Router

let routes = Router()

routes.use('/products', productRouter)
routes.use('/users', userRouter)

// rota GET padrão / 
// request representa a requisição e response a resposta
routes.get('/', (request, response) => {

    // retorna uma mensagem no formato JSON
    return response.json({
        message: 'Funcionou meu primeiro exemplo'
    })

})

// exporta o objeto para uso em outro arquivo
export default routes;

