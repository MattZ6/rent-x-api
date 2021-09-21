## 📋 Sumário

- **RF** - Requisitos funcionais;
- **RNF** - Requisitos não funcionais;
- **RN** - Regras de negócio;

## ⚙ Funcionalidades

### Cadastro de carros

#### RF

- [x] Deve ser possível cadastrar um novo carro;

#### RN

- [x] Não deve ser possível cadastrar um carro com uma placa de um carro já cadastrado;
- [x] Por padrão, o carro deve ser cadastrado estando disponível para aluguel;
- [x] Somente usuários administradores devem poder realizar cadastro de carros;

### Listagem de carros

#### RF

- [x] Deve ser possível listar todos os carros disponíveis para alguel;
- [x] Deve ser possível listar todos os carros pelo nome do carro;
- [x] Deve ser possível listar todos os carros pela marca;
- [x] Deve ser possível listar todos os carros pela categoria;

#### RN

- [x] O usuário não precisa estar logado no sistema;

### Adição da Especificação ao Carro

#### RF

- [x] Deve ser possível adicionar uma ou mais especificações ao carro;

#### RN

- [x] Não deve ser possível adicionar uma mesma especificação a um carro;
- [x] Somente usuários administradores devem poder realizar a adição da especificação ao carro;

### Cadastro de imagens ao Carro

#### RF

- [x] Deve ser possível cadastrar uma ou mais imagens ao carro;

#### RNF

- [x] Utilizar o Multer para realizar o upload dos arquivos;

#### RN

- [x] Somente usuários administradores devem poder realizar o cadastro de imagens ao carro;

### Aluguel de Carros

#### RF

- [x] Deve ser possível agendar o aluguel de um Carro;

#### RN

- [x] O aluguél deve ter duração mínima de 24hrs (vinte e quatro horas);
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário;
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro;
