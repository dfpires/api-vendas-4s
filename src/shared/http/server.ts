
// importa dependência do express
import express from 'express';

// cria um servidor express
let servidor = express();

import routes from './routes/routes'

// associa as rotas ao servidor
servidor.use(routes)

// importa e executa a conexão com o banco de dados
import './../typeorm'

// sobe o servidor, que fica escutando e aguardando as requisições
servidor.listen(3333, () => {

    console.log(`Server up and running`)

})

