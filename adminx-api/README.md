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
    - [🗂️ **Categoria** (`Category`)](#️-categoria-category)
      - [**• Endpoints**](#-endpoints-3)
      - [**• Modelagem**](#-modelagem-2)
    - [💸 **Transação** (`Transaction`)](#-transação-transaction)
      - [**• Endpoints**](#-endpoints-4)
      - [**• Modelagem**](#-modelagem-3)
    - [📊 **Orçamento** (`Budget`)](#-orçamento-budget)
      - [**• Endpoints**](#-endpoints-5)
      - [**• Modelagem**](#-modelagem-4)
    - [📈 **Relatórios** (`Reports`)](#-relatórios-reports)
      - [**• Endpoints**](#-endpoints-6)

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

| Método | Rota            | Descrição                        |
| ------ | --------------- | -------------------------------- |
| GET    | `/accounts`     | Listar contas do usuário         |
| POST   | `/accounts`     | Criar nova conta                 |
| GET    | `/accounts/:id` | Detalhes de uma conta específica |
| PUT    | `/accounts/:id` | Atualizar conta                  |
| DELETE | `/accounts/:id` | Deletar conta                    |

#### **• Modelagem**

```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "name": "Conta Corrente",
  "type": "checking", // débito, crédito
  "balance": 2500.00,
  "currency": "BRL",
  "createdAt": ISODate,
  "updatedAt": ISODate
}

```

---

### 🗂️ **Categoria** (`Category`)

#### **• Endpoints**

| Método | Rota              | Descrição            |
| ------ | ----------------- | -------------------- |
| GET    | `/categories`     | Listar categorias    |
| POST   | `/categories`     | Criar nova categoria |
| PUT    | `/categories/:id` | Atualizar categoria  |
| DELETE | `/categories/:id` | Deletar categoria    |

#### **• Modelagem**

```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "name": "Alimentação",
  "type": "despesa", // despesa, renda
  "color": "#FF5733",
  "icon": "shopping-cart"
}
```

---

### 💸 **Transação** (`Transaction`)

#### **• Endpoints**

| Método | Rota                | Descrição                 |
| ------ | ------------------- | ------------------------- |
| GET    | `/transactions`     | Listar transações         |
| POST   | `/transactions`     | Criar nova transação      |
| GET    | `/transactions/:id` | Detalhes de uma transação |
| PUT    | `/transactions/:id` | Atualizar transação       |
| DELETE | `/transactions/:id` | Deletar transação         |

#### **• Modelagem**

```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "accountId": ObjectId,
  "categoryId": ObjectId,
  "type": "despesa", // despesa, renda
  "amount": 150.00,
  "description": "Supermercado",
  "date": ISODate,
  "createdAt": ISODate
}

```

---

### 📊 **Orçamento** (`Budget`)

#### **• Endpoints**

| Método | Rota           | Descrição            |
| ------ | -------------- | -------------------- |
| GET    | `/budgets`     | Listar orçamentos    |
| POST   | `/budgets`     | Criar novo orçamento |
| PUT    | `/budgets/:id` | Atualizar orçamento  |
| DELETE | `/budgets/:id` | Deletar orçamento    |

#### **• Modelagem**

```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "categoryId": ObjectId,
  "limit": 1000.00,
  "period": "mensal", // mensal, semanal, anual
  "startDate": ISODate,
  "endDate": ISODate
}
```

---

### 📈 **Relatórios** (`Reports`)

#### **• Endpoints**

| Método | Rota                | Descrição                         |
| ------ | ------------------- | --------------------------------- |
| GET    | `/reports/summary`  | Resumo financeiro (entrada/saída) |
| GET    | `/reports/monthly`  | Relatório mensal                  |
| GET    | `/reports/category` | Gastos por categoria              |

---
