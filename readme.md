# Este é um teste para desenvolvedores

Tabela de Conteúdo

* [Começando](#começando)
* [Estrutura do projeto](#estrutura-do-projeto)
* [A Aplicação](#a-aplicação)
* [Pontos Importantes](#pontos-importantes)
* [Pontos a acrescentar](#pontos-a-acrescentar)


## Começando

Instalando as dependências

```bash
npm install
```

Rode a aplicação

```bash
npm start
```

O servidor vai iniciar na porta `3000`

Utilize alguma ferramenta para realizar as requisições http
```
Exemplos: Postman, Insomnia.
```

## Estrutura do projeto

```bash
src/
  adapters/               # Adaptadores para acessar a aplicação
    express/              # Servidor http via express
      controllers/        # Controladores
      middlwares/         # Middlewares para a aplicação express
      routes/             # Rotas de api
      index.js            # Entrypoint do servidor express

   application/           # Camada de aplicaçao
    usercases/            # Casos de uso da aplicação
   
   domain/                 # Camada de domínio
    models/                # Entidades
    repositories/          # Repositórios de acesso ao BD

   infra/                  # Infraestrutura
    database/              # Configs de banco de dados
    utils/                 # Funções utilitárias
     exceptions/           # Utilitários de exceções
```

## A Aplicação

> TODAS as rotas precisam que exista no `header` da requisição um token `jwt` com senha = `secret`

`GET` `/user` Retorna todos os usuários do sistema

![image](https://github.com/LeoFuna/workers-database/assets/80538553/d3b4a605-4d33-47d3-8a9a-27e2233ddd86)

`GET` `/user/:name` Retorna um usuário pelo nome

![image](https://github.com/LeoFuna/workers-database/assets/80538553/2e30f4b4-3079-4e50-981e-a5c434e481c6)

`POST` `/user` Cria um novo usuário

![image](https://github.com/LeoFuna/workers-database/assets/80538553/54fac1e9-12d2-474e-b20e-c242c52022fa)

`PUT` `/user/:id` Edita um usuário pelo id (Acesso limitado a usuários logados com `roleId`: `admin` ou `manager` no token)

![image](https://github.com/LeoFuna/workers-database/assets/80538553/d12839b9-3970-406e-8a1c-acad91552257)

`DELETE` `/user/:name` Deleta um usuário pelo nome (Acesso limitado a usuários logados com `roleId`: `admin` ou `manager` no token)

![image](https://github.com/LeoFuna/workers-database/assets/80538553/c61b2e8c-4851-4415-ada7-25312ac243ae)

`GET` `/user/:name/access` Retorna quantas vezes um usuário foi acessado

![image](https://github.com/LeoFuna/workers-database/assets/80538553/0e364cc9-9da6-4b71-836a-cf7d35ac97ff)

## Pontos importantes

* A Aplicação foi desenvolvido com base na Arquitetura Hexagonal
* Foi configurado um padrão de formatação nos arquivos através do prettier, eslint e vscode.
* A secret nao foi colocada em como variável de ambiente somente para otimizar o desenvolvimento.
* Foi utilizado jwt para verificar se o usuário possuia token válido e para ter alguns dados sobre quem seria o usuário logado.
* Os testes foram implementados em alguns métodos e classes específicos a título de demonstrar conhecimento.

## Pontos a acrescentar

* Adicionar testes para todas as classes e métodos.
* Criar endpoint para login que retorne o token `jwt`

