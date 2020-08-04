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
  - [DotEnv](#dotenv)
  - [Password](#password)
  - [JsonWebToken](#jsonwebtoken)
- [Módulo Middlewares](#módulo-middlewares)
  - [Validations](#validations)
  - [bodyFilterMiddleware](#bodyFilterMiddleware)
  - [errorMiddleware](#errorMiddleware)
  - [notFoundMiddleware](#notFoundMiddleware)
- [Módulo Base](#módulo-base)
  - [MongoDB](#mongodb)
  - [HttpServer](#httpserver)

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

### DotEnv
Módulo para configuração de variáveis de ambiente utilizando a biblioteca [dotenv](https://www.npmjs.com/package/dotenv).

```js
import { DotEnv } from '@simple-ti/express-api-base';

/*
Função irá configurar as variáveis de ambiente de acordo com o arquivo .env na
raíz do projeto, podendo passar também um objeto de configuração de acordo com
a documentação da biblioteca.
*/
DotEnv.config();

export const Env = {
  /*
  Função para verificar se a variável existe e caso não exista sempre retornar
  uma string, mantendo a consistência na tipagem das variáveis.
  */
  MONGODB_URL: DotEnv.envToString('MONGODB_URL'),
  JWT_HASH_KEY: DotEnv.envToString('JWT_HASH_KEY'),
  JWT_EXPIRATION_TIME: DotEnv.envToString('JWT_EXPIRATION_TIME'),
};
```

### Password
Módulo para criptografar e comparar senhas, utilizando a bilblioteca [bcrypt](https://www.npmjs.com/package/bcrypt).

```js
import { Password } from '@simple-ti/express-api-base';

/*
Função para criptografar uma senha, deve ser informado no primeiro parâmetro a
senha, podendo também ser informado no segundo parâmetro um número inteiro para
aumentar a força da criptografia (o padrão é 10), quanto maior o valor, maior
será o custo de processamento. A função tem como retorno a senha criptografada.
*/
const hash = await Password.hash('some_password');

/*
Função para comparar se uma senha equivale a uma senha criptografa, deve ser
informado no primeiro parâmetro a senha descriptografada, e no segundo parâmetro
a senha criptografada. A função tem como retorno um boolean indicando se a senha
equivale ou não.
*/
const isPasswordValid = await Password.compare('some_password', hash);
```

### JsonWebToken
Módulo para criptografar e descriptografar [Json Web Token (JWT)](https://jwt.io/introduction), utilizando a biblioteca [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).

```js
import { JsonWebToken } from '@simple-ti/express-api-base';

// Interface para definir o tipo do JWT.
interface TokenData {
  some: string;
}

/*
Função para criptografar um JWT, deve ser informado no primeiro parâmetro um
objeto com os dados que serão criptografados, no segundo parâmetro deve ser
informado uma string contendo a chave que será utilizada na criptografia, no
terceiro parâmetro pode ser informado um objeto com configurações segundo a
documentação da biblioteca.
*/
const tokenHash = await JsonWebToken.sign(
  { some: 'data' },
  'secret_hash_key',
  { expiresIn: Env.JWT_EXPIRATION_TIME }
);

/*
Função para verficar e descriptografar um JWT, deve ser informado no primeiro
uma string contendo o JWT criptografado, no segundo parâmetro deve ser informado
uma string contendo a chave que será utilizada, na criptografia, no terceiro
parâmetro pode ser informado um objeto com configurações segundo a documentação
da biblioteca. Nos parâmetros de tipagem pode ser passado um parâmetro com a
tipagem que será utilizado no JWT retornado.
*/
const decodedToken = await JsonWebToken.verify<TokenData>(
  tokenHash.toString(),
  'secret_hash_key'
);
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

## Módulo Base
### MongoDB
Módulo para gerenciar a conexão com o banco de dados, utilizando a biblioteca mongoose.

```js
import { MongoDB } from '@simple-ti/express-api-base';

/*
Função para conectar no banco de dados, deve ser informado no primeiro parâmetro
uma string contendo a URL de conexão, pode ser informado como segundo parâmetro
um objeto com algumas configurações, verificar a documentação da biblioteca.
*/
await MongoDB.connect('connection_string', { autoReconnect: true });

// Função para fechar todas as conexões e desconectar do banco de dados.
await MongoDB.disconnect();
```

### HttpServer
Módulo para criar uma instância `HTTP.Server` utilizando o server nativo no NodeJS e Express.

```js
import { Router } from 'express';
import { HttpServer } from '@simple-ti/express-api-base';

/*
Função para criar uma instância, retornando um objeto do tipo HttpServerInstance,
contendo as funções start e shutdown, e o objeto instances, com as instâncias
construidas do server http nativo e do Express.
*/
const server = HttpServer.create({
  // As rotas que serão definidas na aplicação.
  applicationRoutes: Router(),

  // Porta TCP que será utilizada para expor o server.
  port: 5000,

  // (Opcional) Função que será utilizada para compor a inicialização do server.
  startFunction = async () => {},

  // (Opcional) Função que será utilizada para compor o desligamento do server.
  shutdownFunction = async () => {},

  // (Opcional)
  // Parâmetro booleano para verificar se será utilizado o middleware de CORS.
  // Valor inicial definido como true.
  useCors: true,

  // (Opcional)
  // Parâmetro booleano para verificar se será utilizado o middleware de erro padrão.
  // Valor inicial definido como true.
  useErrorMiddleware: true,

  // (Opcional)
  // Parâmetro booleano para verificar se será utilizado o middleware de JSON no body.
  // Valor inicial definido como true.
  useJsonBody: true,

  // (Opcional)
  // Parâmetro booleano para verificar se será utilizado o middleware de logger.
  // Valor inicial definido como true.
  useLogger: true,

  // (Opcional)
  // Parâmetro booleano para verificar se será utilizado o middleware de rotas não encontradas.
  // Valor inicial definido como true.
  useNotFoundMiddleware: true,
});

// Utilização da função shutdown para responder aos sinais de desligamento do Docker.
process.on('SIGINT', server.shutdown);
process.on('SIGTERM', server.shutdown);

// Inicializando o servidor de aplicação.
server.start();
```
