<div align="center">
  <h1>
    🏎 Rent-X — Ignite 🔥
  </h1>

  > Back-end API da aplicação de alugueis de veículos Rent-X, construída na trilha de Node JS do bootcamp Ignite da Rocketseat.
</div>

## 💡 Você vai precisar

- Primeiramente de uma xícara de ☕ bem quentinho;
- [Node JS](https://nodejs.org/) instalado em sua máquina;
- [🐳 Docker](https://www.docker.com) instalado em sua máquina — junto do  [Docker compose](https://docs.docker.com/compose/install);

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

Para rodar a aplicação em ambiente de desenvolvimento, execute o comando:

```bash
docker-compose up -d
```

Rode as migrations:

```bash
yarn typeorm migration:run
```

No caso de você já ter executado o comando anterior e precisar subir os serviços novamente, execute o comando:

```bash
docker-compose start
```

Por fim, para parar a execução dos seviços, execute:

```bash
docker-compose stop
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
