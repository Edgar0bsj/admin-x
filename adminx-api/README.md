# ADMIN-X API RESTful

- [ADMIN-X API RESTful](#admin-x-api-restful) - [**Autenticação** (`Auth`)](#autenticação-auth) - [**Relações de modelo**](#relações-de-modelo)

---

### **Autenticação** (`Auth`)

| Método     | Rota             | Descrição                     |
| ---------- | ---------------- | ----------------------------- |
| POST       | `/auth/register` | Registro de novo usuário      |
| POST       | `/auth/login`    | Login e geração de token      |
| Middleware | `verifyToken`    | Verificar se o token é válido |

```mermaid
sequenceDiagram
    participant Cliente
    participant Servidor
    participant BancoDeDados

Note right of Cliente: /auth/register
Cliente->>+Servidor: (POST) /auth/register<br>{ name, email, password }
Servidor->>+BancoDeDados: Salva novo usuário
BancoDeDados-->>-Servidor: Ok
Servidor-->>-Cliente:Status 201
Note right of Cliente: /auth/login
Cliente->>+Servidor: (POST) /auth/login<br>{ email, password }
Servidor->>+BancoDeDados:Buscar por Email
BancoDeDados-->>-Servidor:Usuário
Servidor-->>-Cliente:Token
Note right of Cliente: middleware<br>verifyToken
Cliente->>Servidor:Token
Servidor->>Servidor:Verifica o token
Servidor->>Servidor:Next Rota
```

---

### **Usuário** (`User`)

| Método | Rota        | Descrição                  |
| ------ | ----------- | -------------------------- |
| GET    | `/user`     | Obter dados do usuário     |
| PUT    | `/user/:id` | Atualizar dados do usuário |
| DELETE | `/user/:id` | Deletar conta do usuário   |

---

### **Cards** (`Card`)

| Método | Rota        | Descrição                      |
| ------ | ----------- | ------------------------------ |
| GET    | `/card`     | Obter todas as funcionalidades |
| PUT    | `/card/:id` | Atualizar card                 |
| DELETE | `/card/:id` | Deletar card                   |

### **Relações de modelo**

```mermaid
classDiagram
    class User{
        String -> name
        String -> email
        String -> password
    }
    class Card{
        String -> id
        String -> title
        String -> description
        String -> icon
        String -> color
        String -> badge
        Object -> stats -> label & value
    }
```
