# Express API Base
Módulo contendo todas as libs e middlewares para criação de API's REST utilizando Express, Mongoose, Yup e Pino Logger

## Documentação
- HttpStatus: Módulo contendo nome e código dos status HTTP.
```js
import { HttpStatus } from '@simple-ti/express-api-base';

const status = HttpStatus.OK;
/*
{
  name: 'Ok',
  number: 200
}
*/
```

- Response: Módulo para facilitar a criação e retorno de respostas e erros no formato JSON.
```js
import { Response, HttpStatus } from '@simple-ti/express-api-base';

// Cria um objeto de resposta de sucesso.
const response = Response.build({ ok: true });
/*
{
  content: {
    ok: true
  }
}
*/

/*
Cria um objeto de resposta de erro, onde se não informado nenhum parâmetro o status
padrão é Internal Server Error.
*/
const error = Response.buildError('Deu erro', HttpStatus.BAD_REQUEST);
/*
{
  error: {
    status: 400,
    data: {
      timestamp: 1593994166,
      name: 'Bad Request',
      message: 'Deu erro'
    }
  }
}
*/

// Verifica se é uma resposta de sucesso ou erro e envia, caso seja uma resposta de sucesso e status de retorno será 200, caso seja uma resposta de erro o status enviado é o que foi definido no objeto de erro. O primeiro parâmetro é o objeto Response definido no controller do express e o segundo parâmetro é o objeto de resposta.
Response.send(res, error);
```

- logger: Função que define a instância do logger, utilizando a biblioteca pino
```js
import { logger } from '@simple-ti/express-api-base';

// Verificar documentação da biblioteca.
logger.info('Logando uma informação');
```

- loggerMiddleware: Função que retorna o middleware do logger para ser utilizado com o express.
```js
import express from 'express';
import { loggerMiddleware } from '@simple-ti/express-api-base';

const app = express();
app.use(loggerMiddleware);
```

- modelToJSONFilter: Função para filtrar atributos que não devem estar presente no JSON dos models do mongoose, por padrão filtra os atributos '_id', '__v', 'createdAt', 'updatedAt', podendo ser passado N atributos como parâmetro.
```js
import { Schema } from 'mongoose';
import { modelToJSONFilter } from '@simple-ti/express-api-base';

const schema = new Schema(
  {
    name: String,
    email: String,
    password: String
  },
  {
    timestamps: true,
    toJSON: {
      transform: modelToJSONFilter('password', 'arg2', 'argN')
    }
  }
);
```
