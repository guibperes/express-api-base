# Express API Base
Módulo contendo todas as libs e middlewares para criação de API's REST utilizando Express, Mongoose, Yup e Pino Logger.

Verifique as alterações versionadas em [CHANGELOG](CHANGELOG.md).

- [Módulo Libs](#módulo-libs)
  - [HttpStatus](#httpStatus)
  - [Response](#response)
  - [logger](#logger)
  - [loggerMiddleware](#loggerMiddleware)
  - [modelToJSONFilter](#modelToJSONFilter)
  - [getValueByObjectPath](#getValueByObjectPath)
  - [Cors](#cors)
- [Módulo Middlewares](#módulo-middlewares)
  - [Validations](#validations)
  - [bodyFilterMiddleware](#bodyFilterMiddleware)
  - [errorMiddleware](#errorMiddleware)
  - [notFoundMiddleware](#notFoundMiddleware)

## Módulo Libs
### HttpStatus
Módulo contendo nome e código dos status HTTP.
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

### Response
Módulo para facilitar a criação e retorno de respostas e erros no formato JSON.
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

/*
Verifica se é uma resposta de sucesso ou erro e envia, caso seja uma resposta
de sucesso o status de retorno será 200, caso seja uma resposta de erro o status
enviado é o que foi definido no objeto de erro. O primeiro parâmetro é o objeto
Response definido no controller do express e o segundo parâmetro é o objeto de resposta.
*/
Response.send(res, error);
```

### logger
Função que define a instância do logger, utilizando a biblioteca pino
```js
import { logger } from '@simple-ti/express-api-base';

// Verificar documentação da biblioteca.
logger.info('Logando uma informação');
```

### loggerMiddleware
Função que retorna o middleware do logger para ser utilizado com o express.
```js
import express from 'express';
import { loggerMiddleware } from '@simple-ti/express-api-base';

const app = express();
app.use(loggerMiddleware);
```

### modelToJSONFilter
Função para filtrar atributos que não devem estar presente no JSON dos models do mongoose, por padrão filtra os atributos '_id', '__v', 'createdAt', 'updatedAt', podendo ser passado N atributos como parâmetro.
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

### getValueByObjectPath
Função para recuperar o valor em um atributo de um objeto, caso o atributo não exista será retornado `undefined`, deve ser passado como primeiro parâmetro em qual objeto deseja recuperar o valor, e deve ser passado N parâmetros que formarão o caminho até o atributo.
```js
import { getValueByObjectPath } from '@simple-ti/express-api-base';

const searchObject = {
  nestedObject: {
    value: 'Some value',
  },
  otherValue: 'Other value',
};

getValueByObjectPath(searchObject, 'nestedObject', 'value');
// 'Some value'

getValueByObjectPath(searchObject, 'otherValue');
// 'Other value'

getValueByObjectPath(searchObject, 'someValue');
// undefined
```

### Cors
Módulo para configuração de [CORS (Cross-Origin Resource Sharing)](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Controle_Acesso_CORS).
```js
import express from 'express';
import { Cors } from '@simple-ti/express-api-base';

const app = express();
app.use(Cors.config());
```

## Módulo Middlewares
### Validations
Módulo para validar os parâmetros e atributos nos controllers. Utilizando a biblioteca Yup e a função de validação de ObjectId do Mongoose.
```js
import { Router } from 'express';
import { Validations } from '@simple-ti/express-api-base';

const routes = Router();

routes.get(
  '/:id',
  /*
  Middleware para verificar se o ObjectId é válido. Deve ser especificado em
  qual propriedade do objeto Response será verificado o valor do ObjectId.
  */
  Validations.validateObjectId('params', 'id'), // req.params.id
  // Restante dos middlewares
);

routes.post(
  '/',
  /*
  Função que retorna um middleware para validar o body da requisição,
  sendo passado como parâmetro um objeto de validação do Yup.
  */
  Validations.validateBody(yupObjectSchema)
  // Restante dos middlewares
);
```

### bodyFilterMiddleware
Middleware para filtrar atributos que são enviados no corpo da requisição, por padrão remove os atributos '_id', '__v', 'createdAt', 'updatedAt', e recebe N parâmetros.
```js
import { Router } from 'express';
import { bodyFilterMiddleware } from '@simple-ti/express-api-base';

const routes = Router();

routes.post(
  '/',
  // Remove todos os atributos especificados e continua a requisição.
  bodyFilterMiddleware('password', 'arg2', 'argN')
  // Restante dos middlewares
);
```

### errorMiddleware
Define o middleware padrão para o express utilizar caso um erro não tenha um tratamento específico.
```js
import express from 'express';
import { errorMiddleware } from '@simple-ti/express-api-base';

const app = express();
app.use(errorMiddleware);
```

### notFoundMiddleware
Define o middleware para quando não for encontrado nenhuma rota correspondente definida na aplicação.
```js
import express from 'express';
import { notFoundMiddleware } from '@simple-ti/express-api-base';

const app = express();

// Deve ser definido depois das rotas.
app.use('*', notFoundMiddleware);
```
