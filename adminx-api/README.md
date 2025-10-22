# ADMIN-X API RESTfull

- [ADMIN-X API RESTfull](#admin-x-api-restfull)
	- [1. **Autenticação (auth)**](#1-autenticação-auth)
		- [POST `/auth/register`](#post-authregister)
		- [POST `/auth/login`](#post-authlogin)
	- [2. **Usuário (user)**](#2-usuário-user)
		- [GET `/user/`](#get-user)
		- [PUT `/user/`](#put-user)
		- [DELETE `/user/`](#delete-user)
	- [3. **Financeiro (account)**](#3-financeiro-account)
		- [POST `/financer/account/`](#post-financeraccount)
		- [PUT `/financer/account/:id`](#put-financeraccountid)
		- [GET `/financer/account/`](#get-financeraccount)
		- [DELETE `/financer/account/:id`](#delete-financeraccountid)
	- [3.1. **Financeiro (category)**](#31-financeiro-category)
		- [POST `/financer/category/`](#post-financercategory)
		- [GET `/financer/category/`](#get-financercategory)
		- [PUT `/financer/category/:id`](#put-financercategoryid)
		- [DELETE `/financer/category/:id`](#delete-financercategoryid)
	- [3.2. **Financeiro (transaction)**](#32-financeiro-transaction)
		- [POST `/financer/transaction/`](#post-financertransaction)
		- [GET `/financer/transaction/`](#get-financertransaction)
		- [PUT `/financer/transaction/:id`](#put-financertransactionid)
		- [DELETE `/financer/transaction/:id`](#delete-financertransactionid)
	- [3.3. **Financeiro (budget)**](#33-financeiro-budget)
		- [POST `/financer/budget/`](#post-financerbudget)
		- [GET `/financer/budget/`](#get-financerbudget)
		- [PUT `/financer/budget/:id`](#put-financerbudgetid)
		- [DELETE `/financer/budget/:id`](#delete-financerbudgetid)
	- [3.4. **Financeiro**](#34-financeiro)
		- [GET `/financer/transaction/account/:accountId`](#get-financertransactionaccountaccountid)
		- [GET `/financer/transaction/category/:categoryId`](#get-financertransactioncategorycategoryid)
		- [GET `/financer/transaction/date-range`](#get-financertransactiondate-range)
		- [GET `/financer/stats/monthly`](#get-financerstatsmonthly)

---

## 1. **Autenticação (auth)**

### POST `/auth/register`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "name": "Edgar junior",
  "email": "01.edgarjunior@gmail.com",
  "password": "321321abc"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Created 201
```

</details>

### POST `/auth/login`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "email": "01.edgarjunior@gmail.com",
  "password": "321321abc"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZjcwODU3Nzc4ODhkODI4ZjY5ZDQ1NyIsImlhdCI6MTc2MTA4MjEyMSwiZXhwIjoxNzYxMDg1NzIxfQ.c3s6B9ewwxAgk28uw_coLNU5lkfHlv8HIQ0oBgeEStk"
}
```

</details>

---

## 2. **Usuário (user)**

### GET `/user/`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
{
  "_id": "68f7085777867d828f69u457",
  "name": "edgar junior",
  "email": "01.edgarjunior@gmail.com",
  "createdAt": "2025-10-21T04:13:11.023Z",
  "updatedAt": "2025-10-21T04:13:11.023Z"
}
```

</details>

### PUT `/user/`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "name": "nome atualizado",
  "email": "01.edgarjunior@gmail.com",
  "password": "123123"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Created 201
```

</details>

### DELETE `/user/`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
NO CONTANTE 204
```

</details>

---

## 3. **Financeiro (account)**

### POST `/financer/account/`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "name": "Conta principal",
  "type": "c", // "c" -> crédito | "d" -> débito
  "balance": 250
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Created 201
```

</details>

### PUT `/financer/account/:id`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "name": "Conta principal atualizada",
  "type": "d",
  "balance": 600
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Created 201
```

</details>

### GET `/financer/account/`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
[
  {
    "_id": "68f71972ebe2a0046e263948",
    "userId": "68f7085777888d828f69d457",
    "name": "conta principal",
    "type": "d",
    "balance": 700,
    "createdAt": "2025-10-21T05:26:10.774Z",
    "updatedAt": "2025-10-21T21:43:39.891Z"
  },
  {
    "_id": "32f71972ebe34a0046e873948",
    "userId": "68f7085777888d828f69d457",
    "name": "conta DOIS",
    "type": "c",
    "balance": 980,
    "createdAt": "2025-10-21T05:26:10.774Z",
    "updatedAt": "2025-10-21T21:43:39.891Z"
  }
]
```

</details>

### DELETE `/financer/account/:id`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
NO CONTENT 204
```

</details>

## 3.1. **Financeiro (category)**

### POST `/financer/category/`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "name": "Alimentação",
  "color": "#FF6B6B",
  "icon": "🍽️",
  "type": "despesa" // "despesa" | "receita"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Created 201
```

</details>

### GET `/financer/category/`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
[
  {
    "_id": "68f7d4cea9410f554f72e589",
    "userId": "68f7085777888d828f69d457",
    "name": "alimentação",
    "color": "#000000",
    "icon": "📝",
    "type": "receita",
    "createdAt": "2025-10-21T18:45:34.319Z",
    "updatedAt": "2025-10-21T18:46:11.317Z"
  },
  {
    "_id": "12f732cea941435554f567589",
    "userId": "68f7085777888d828f69d457",
    "name": "alimentação",
    "color": "#683939ff",
    "icon": "📝",
    "type": "despesa",
    "createdAt": "2025-10-21T18:45:34.319Z",
    "updatedAt": "2025-10-21T18:46:11.317Z"
  }
]
```

</details>

### PUT `/financer/category/:id`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "name": "Mudei o nome",
  "color": "#FF6B6B",
  "icon": "🍽️",
  "type": "despesa"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Created 201
```

</details>

### DELETE `/financer/category/:id`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
NO CONTENT 204
```

</details>

## 3.2. **Financeiro (transaction)**

### POST `/financer/transaction/`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "accountId": "68f71972ebe2a0046e263948",
  "categoryId": "68f7d4cea9410f554f72e589",
  "amount": 82,
  "description": "Supermercado",
  "date": "2024-01-15",
  "type": "despesa"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Created 201
```

</details>

### GET `/financer/transaction/`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
[
  {
    "_id": "68f7d376a9410f554f72e57f",
    "userId": "68f7085777888d828f69d457",
    "accountId": "68f7085777888d828f69d458",
    "categoryId": "68f7085777888d828f69d459",
    "amount": 150.5,
    "description": "Supermercado",
    "date": "2024-01-15T00:00:00.000Z",
    "type": "despesa",
    "createdAt": "2025-10-21T18:39:50.973Z",
    "updatedAt": "2025-10-21T18:39:50.973Z"
  }
]
```

</details>

### PUT `/financer/transaction/:id`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "accountId": "68f7085777888d828f69d458",
  "categoryId": "68f7085777888d828f69d459",
  "amount": 200.0,
  "description": "Supermercado - atualizado",
  "date": "2024-01-15",
  "type": "despesa"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Status code 201
```

</details>

### DELETE `/financer/transaction/:id`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização e ID na URL)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Status code 204
```

</details>

## 3.3. **Financeiro (budget)**

### POST `/financer/budget/`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "categoryId": "68f7085777888d828f69d459",
  "amount": 500.0,
  "period": "monthly",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Status code 201
```

</details>

### GET `/financer/budget/`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas headers de autorização)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
[
  {
    "_id": "68f7d376a9410f554f72e57f",
    "userId": "68f7085777888d828f69d457",
    "categoryId": "68f7085777888d828f69d459",
    "amount": 500.0,
    "spent": 150.0,
    "period": "monthly",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-01-31T23:59:59.999Z",
    "createdAt": "2025-10-21T18:39:50.973Z",
    "updatedAt": "2025-10-21T18:39:50.973Z"
  }
]
```

</details>

### PUT `/financer/budget/:id`

<details> <summary>Exemplo de Entrada</summary>

```json
{
  "categoryId": "68f7085777888d828f69d459",
  "amount": 600.0,
  "period": "monthly",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Status code 201

```

</details>

### DELETE `/financer/budget/:id`

<details> <summary>Exemplo de Entrada</summary>

```json
Nenhuma (apenas ID na URL)
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Status code 204

```

</details>

## 3.4. **Financeiro**

### GET `/financer/transaction/account/:accountId`

<details> <summary>Exemplo de Entrada</summary>

```json
ID da conta na URL
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Lista de transações filtradas por conta

```

</details>

### GET `/financer/transaction/category/:categoryId`

<details> <summary>Exemplo de Entrada</summary>

```json
ID da categoria na URL
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Lista de transações filtradas por categoria
```

</details>

### GET `/financer/transaction/date-range`

<details> <summary>Exemplo de Entrada</summary>

```json
Query params `?startDate=2024-01-01&endDate=2024-01-31`
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
Lista de transações no período
```

</details>

### GET `/financer/stats/monthly`

<details> <summary>Exemplo de Entrada</summary>

```json
Query params `?month=01&year=2024`
```

</details>
<details> <summary>Exemplo de Saida</summary>

```json
{
  "totalIncome": 3000.0,
  "totalExpense": 1500.0,
  "balance": 1500.0,
  "transactionsCount": 25,
  "categoriesBreakdown": [
    {
      "categoryId": "68f7085777888d828f69d459",
      "categoryName": "Alimentação",
      "amount": 500.0
    }
  ]
}
```

</details>
