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
- [ ] * Somente usuários administradores devem poder realizar cadastro de carros;

### Listagem de carros

#### RF

- [ ] Deve ser possível listar todos os carros disponíveis para alguel;
- [ ] Deve ser possível listar todos os carros pela categoria;
- [ ] Deve ser possível listar todos os carros pela marca;
- [ ] Deve ser possível listar todos os carros pelo nome do carro;

#### RN

- [ ] O usuário não precisa estar logado no sistema;

### Adição da Especificação ao Carro

#### RF

- [ ] Deve ser possível adicionar uma ou mais especificações ao carro;
- [ ] Deve ser possível listar todas as especificações;
- [ ] Deve ser possível listar todos os carros;

#### RN

- [ ] Não deve ser possível adicionar uma mesma especificação a um carro;
- [ ] Somente usuários administradores devem poder realizar a adição da especificação ao carro;

### Cadastro de imagens ao Carro

#### RF

- [ ] Deve ser possível cadastrar uma ou mais imagens ao carro;
- [ ] Deve ser possível listar todos os carros;

#### RNF

- [ ] Utilizar o Multer para realizar o upload dos arquivos;

#### RN

- [ ] Somente usuários administradores devem poder realizar o cadastro de imagens ao carro;

### Aluguel de Carros

#### RF

- [ ] Deve ser possível agendar o aluguel de um Carro;

#### RN

- [ ] O aluguél deve ter duração mínima de 24hrs (vinte e quatro horas);
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário;
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro;
