<div align="center">
  <h1>
    🏎 Rent-X API — Ignite 🔥
  </h1>

  > Back-end API da aplicação de alugueis de veículos Rent-X, construída na trilha de Node JS do bootcamp Ignite da Rocketseat.

  <strong>🚧 Em desenvolvimento... 🚧</strong>

  [![build-image]][build-url] [![coveralls-image]][coveralls-url] [![license-image]][license-url]
</div>

## 📝 Requisitos

Você pode encontrar os requisitos da aplicação [aqui](https://github.com/MattZ6/rent-x-api/tree/main/.github/requirements).

## 💡 Você vai precisar

- Primeiramente de uma xícara de ☕ bem quentinho;
- [Node JS](https://nodejs.org/) instalado em sua máquina;
- [🐳 Docker](https://www.docker.com) instalado em sua máquina — junto do [Docker compose](https://docs.docker.com/compose/install);

## 🎉 Começando

Clone o repositório:

```bash
git clone https://github.com/MattZ6/rent-x-api
```

Adentre a pasta do projeto:

```bash
cd rent-x-api
```

Instale as dependências:

```bash
yarn
```

## 🔥 Executando

### Iniciar

Crie uma cópia do arquivo `.env.example` e em seguida prencha as variávels necessárias:

```bash
cp .env.example .env
```

Para rodar a aplicação em ambiente de desenvolvimento, execute o comando:

```bash
docker-compose up

# ou passando a flag -d ao final para executar em modo detached;
```

Rode as migrations:

```bash
yarn typeorm migration:run
```
### Parar

Por fim, para parar a execução dos seviços, execute:

```bash
docker-compose stop
```

## 🧪 Testes

Para executar os testes:

```bash
yarn test
```


## 🤝 Contribuição

Contribuições, issues e novas features são sempre bem-vindas! <br/>
Fique à vontade para explorar as [issues](https://github.com/MattZ6/rent-x-api/issues).

## 👨‍🎤 Autor

Eu mesmo, [Matheus](https://github.com/MattZ6)! 👋
<br />
Quer conversar? [Chama aqui](https://www.linkedin.com/in/mattz6)!

## 📜 Licença

[Licença MIT](https://github.com/MattZ6/rent-x-api/blob/main/LICENSE.md) © 2021 [Matheus Felipe Zanin](https://github.com/MattZ6)

___

<div align="center">
  <strong>Ignite Bootcamp 🔥</strong>
</div>

[license-url]: LICENSE.md
[license-image]: https://img.shields.io/github/license/MattZ6/rent-x-api?color=303030&labelColor=232320&style=for-the-badge

[build-image]: https://img.shields.io/github/workflow/status/MattZ6/rent-x-api/Coveralls/main?style=for-the-badge&labelColor=232320
[build-url]: https://github.com/MattZ6/rent-x-api/actions

[coveralls-image]: https://img.shields.io/coveralls/github/MattZ6/rent-x-api/main?style=for-the-badge&labelColor=232320
[coveralls-url]: https://coveralls.io/github/MattZ6/rent-x-api?branch=main
