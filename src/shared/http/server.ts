
// importa dependência do express
import express, { NextFunction, Request, Response } from 'express';
// importa a dependência do express para erro
import 'express-async-errors'

// vamos utilizar dependência celebrate
import {errors} from 'celebrate'
// vamos utilizar a classe AppError
import AppError from '../../shared/errors/AppErrors'


// cria um servidor express
let servidor = express();

import routes from './routes/routes'

// servidor suporta converte dados do formulário para json
servidor.use(express.json())


// associa as rotas ao servidor
servidor.use(routes)

// servidor vai poder tratar erro do cebrate
servidor.use(errors())

// importa e executa a conexão com o banco de dados
import './../typeorm'

// tratar o erro
servidor.use(
    (error:Error, request: Request, response: Response, next: NextFunction) => {
        if (error instanceof AppError){ // este erro vamos tratar
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message
            })
        }

        // erro não está tratado por nós
        return response.status(500).json({
            status:'error',
            message: 'Internal server error'
        })
    }
)
// 
// sobe o servidor, que fica escutando e aguardando as requisições
servidor.listen(3333, () => {

    console.log(`Server up and running`)

})

