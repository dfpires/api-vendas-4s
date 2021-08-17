
// importa classe Router da dependência express
import {Router} from 'express'

// cria um objeto da classe Router

let routes = Router()

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

