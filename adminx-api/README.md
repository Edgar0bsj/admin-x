# ADMIN-X API RESTful

- [ADMIN-X API RESTful](#admin-x-api-restful)
  - [**-\> Entidade Base**](#--entidade-base)
    - [🔐 **Autenticação** (`Auth`)](#-autenticação-auth)
      - [**• Endpoints**](#-endpoints)
    - [👤 **Usuário** (`User`)](#-usuário-user)
      - [**• Endpoints**](#-endpoints-1)
      - [**• Modelagem**](#-modelagem)
  - [**-\> Entidade Finance**](#--entidade-finance)
    - [🏦 **Conta Bancária** (`Account`)](#-conta-bancária-account)
      - [**• Endpoints**](#-endpoints-2)
      - [**• Modelagem**](#-modelagem-1)

---

## **-> Entidade Base**

### 🔐 **Autenticação** (`Auth`)

#### **• Endpoints**

| Método | Rota                | Descrição                    |
| ------ | ------------------- | ---------------------------- |
| POST   | `/auth/register`    | Registro de novo usuário     |
| POST   | `/auth/login`       | Login e geração de token     |
| GET    | `/auth/verifyToken` | Dados do usuário autenticado |

---

### 👤 **Usuário** (`User`)

#### **• Endpoints**

| Método | Rota         | Descrição                  |
| ------ | ------------ | -------------------------- |
| GET    | `/users/:id` | Obter dados do usuário     |
| PUT    | `/users/:id` | Atualizar dados do usuário |
| DELETE | `/users/:id` | Deletar conta do usuário   |

#### **• Modelagem**

```json
{
  "_id": ObjectId,
  "name": "...",
  "email": "...",
  "passwordHash": "...",
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

---

## **-> Entidade Finance**

### 🏦 **Conta Bancária** (`Account`)

#### **• Endpoints**

| Método | Rota            | Descrição                |
| ------ | --------------- | ------------------------ |
| GET    | `/accounts`     | Listar contas do usuário |
| POST   | `/accounts`     | Criar nova conta         |
| PUT    | `/accounts/:id` | Atualizar conta          |
| DELETE | `/accounts/:id` | Deletar conta            |

#### **• Modelagem**

```ts
{
  "_id": ObjectId,
  "userId": ObjectId,
  name: string,
  type: "Crédito" | "Débito", // débito, crédito
  balance: number,
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```
