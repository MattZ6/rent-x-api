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
- [x] Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

### Devolução do carro alugado

#### RF

- [x] Deve ser possível realizar a devolução de um carro alugado.

#### RN

- [x] Se o carro for devolvido com menos de 24 horas, deverá ser cobrada a diária completa;
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel;
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel;
- [x] Ao realizar a devolução, deverá ser calculado o valor total do aluguel;
- [x] Caso o  horário de devolução seja superior ao horário previsto da entrega, deverá ser cobrado multa proporcional aos dias de atraso;
- [x] Caso haja multa, deverá ser somado ao valor total do aluguel.

### Lista de aluguéis do usuário

#### RF

- [x] Deve ser possível realizar a listagem de todos os alugueis do usuário atual.

### Recuperar senha

#### RF

- [x] Deve ser possível recuperar a senha do usuário informando um e-mail;
- [x] O usuário deve receber um e-mail com instruções sobre a redefinição de sua senha;
- [x] O usuário deve poder inserir uma nova senha.

#### RN

- [x] O link de redefinição de senha deve expirar em 3 horas.
