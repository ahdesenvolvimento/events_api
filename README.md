# Events

## Sumário
1. Sobre o projeto
2. Tecnologias utilizadas
3. Funcionalidades implementadas
4. Diagrama de entidade e relacionamento
    1. Atributos

## 1 - Sobre o projeto
- Foi utilizada a arquitetura REST

## 2 - Tecnologias utilizadas
- Django Restframework
- Sqlite3
- React (CCS, HTML, Javascript)
- Bootstrap5

## 3 - Funcionalidades implementadas
- Cadastro de usuário
- Adição de eventos
- Edição de eventos
- Remoção de eventos
- Listagem de eventos
- Listagem de presenças do usuário
- Confirmar presença no evento
- Remover presença do evento
- Login
- Buscar evento pelo titulo
- Gerar convites para evento

## 4 - Diagrama de entidade e relacionamento
![AplicacaoUML](https://user-images.githubusercontent.com/53409839/147501538-0c3231d7-d2da-416b-861c-94af6819a408.png)
### 4.1 - Atributos
- Event: id, title, description, start_time, finish_time, date_start, date_finish, private, capacity, cep, logradouro, complemento, localidade, bairro, uf, numero, user_owner
- User: id, username, email, first_name, last_name, password
- EventUser: id, id_user, id_event
- ConviteEvent: id, id_user, id_event