"use client";

import React, { useState, useEffect } from "react";
import styles from "@/style/Financer.module.css";
import Layout from "@/components/base/Layout";

/**
 * Tipos de dados para o sistema de controle de gastos
 */
interface Account {
  id: string;
  name: string;
  balance: number;
  type: "checking" | "savings" | "credit";
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  type: "income" | "expense";
}

interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  type: "income" | "expense";
}

interface Budget {
  id: string;
  categoryId: string;
  amount: number;
  spent: number;
  period: "monthly" | "weekly" | "yearly";
  startDate: string;
  endDate: string;
}

/**
 * Componente principal do sistema de controle de gastos
 * Gerencia todas as operações CRUD para contas, categorias, transações e orçamentos
 */
const ExpenseTracker = () => {
  // Estados para gerenciar dados
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  // Estados para controlar formulários
  const [activeTab, setActiveTab] = useState<
    "accounts" | "categories" | "transactions" | "budgets"
  >("accounts");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Estados para formulários
  const [formData, setFormData] = useState<any>({});

  /**
   * Inicializa dados de exemplo ao carregar o componente
   */
  useEffect(() => {
    // Dados de exemplo para demonstração
    setAccounts([
      {
        id: "1",
        name: "Conta Corrente",
        balance: 2500.0,
        type: "checking",
        createdAt: "2024-01-01",
      },
      {
        id: "2",
        name: "Poupança",
        balance: 5000.0,
        type: "savings",
        createdAt: "2024-01-01",
      },
    ]);

    setCategories([
      {
        id: "1",
        name: "Alimentação",
        color: "#FF6B6B",
        icon: "🍽️",
        type: "expense",
      },
      {
        id: "2",
        name: "Salário",
        color: "#4ECDC4",
        icon: "💰",
        type: "income",
      },
      {
        id: "3",
        name: "Transporte",
        color: "#45B7D1",
        icon: "🚗",
        type: "expense",
      },
    ]);

    setTransactions([
      {
        id: "1",
        accountId: "1",
        categoryId: "1",
        amount: 150.0,
        description: "Supermercado",
        date: "2024-01-15",
        type: "expense",
      },
      {
        id: "2",
        accountId: "1",
        categoryId: "2",
        amount: 3000.0,
        description: "Salário mensal",
        date: "2024-01-01",
        type: "income",
      },
    ]);

    setBudgets([
      {
        id: "1",
        categoryId: "1",
        amount: 500.0,
        spent: 150.0,
        period: "monthly",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
      },
    ]);
  }, []);

  /**
   * Função para abrir formulário de criação/edição
   */
  const openForm = (item?: any) => {
    setEditingItem(item || null);
    setFormData(item || {});
    setShowForm(true);
  };

  /**
   * Função para fechar formulário
   */
  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
  };

  /**
   * Função para salvar dados (criar ou editar)
   */
  const saveData = () => {
    if (activeTab === "accounts") {
      const newAccount: Account = {
        id: editingItem?.id || Date.now().toString(),
        name: formData.name || "",
        balance: parseFloat(formData.balance) || 0,
        type: formData.type || "checking",
        createdAt:
          editingItem?.createdAt || new Date().toISOString().split("T")[0],
      };

      if (editingItem) {
        setAccounts(
          accounts.map((acc) => (acc.id === editingItem.id ? newAccount : acc))
        );
      } else {
        setAccounts([...accounts, newAccount]);
      }
    }
    // Implementar lógica similar para outras abas
    closeForm();
  };

  /**
   * Função para deletar item
   */
  const deleteItem = (id: string) => {
    if (activeTab === "accounts") {
      setAccounts(accounts.filter((acc) => acc.id !== id));
    }
    // Implementar lógica similar para outras abas
  };

  /**
   * Função para calcular total de orçamentos
   */
  const getTotalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.amount, 0);
  };

  /**
   * Função para calcular total gasto
   */
  const getTotalSpent = () => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  /**
   * Função para calcular saldo total
   */
  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  return (
    <>
      <Layout>
        <div className={styles.container}>
          {/* Header com estatísticas */}
          <header className={styles.header}>
            <h1 className={styles.title}>Controle de Gastos</h1>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <h3>Saldo Total</h3>
                <p className={styles.statValue}>
                  R$ {getTotalBalance().toFixed(2)}
                </p>
              </div>
              <div className={styles.statCard}>
                <h3>Gastos do Mês</h3>
                <p className={styles.statValue}>
                  R$ {getTotalSpent().toFixed(2)}
                </p>
              </div>
              <div className={styles.statCard}>
                <h3>Orçamento Total</h3>
                <p className={styles.statValue}>
                  R$ {getTotalBudget().toFixed(2)}
                </p>
              </div>
            </div>
          </header>

          {/* Navegação por abas */}
          <nav className={styles.tabNavigation}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "accounts" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("accounts")}
            >
              Contas Bancárias
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "categories" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("categories")}
            >
              Categorias
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "transactions" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("transactions")}
            >
              Transações
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "budgets" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("budgets")}
            >
              Orçamentos
            </button>
          </nav>

          {/* Conteúdo principal */}
          <main className={styles.mainContent}>
            {/* Botão para adicionar novo item */}
            <div className={styles.actionBar}>
              <button className={styles.addButton} onClick={() => openForm()}>
                + Adicionar{" "}
                {activeTab === "accounts"
                  ? "Conta"
                  : activeTab === "categories"
                  ? "Categoria"
                  : activeTab === "transactions"
                  ? "Transação"
                  : "Orçamento"}
              </button>
            </div>

            {/* Lista de itens baseada na aba ativa */}
            <div className={styles.itemsList}>
              {activeTab === "accounts" && (
                <div className={styles.itemsGrid}>
                  {accounts.map((account) => (
                    <div key={account.id} className={styles.itemCard}>
                      <div className={styles.itemHeader}>
                        <h3>{account.name}</h3>
                        <span className={styles.accountType}>
                          {account.type}
                        </span>
                      </div>
                      <div className={styles.itemContent}>
                        <p className={styles.balance}>
                          R$ {account.balance.toFixed(2)}
                        </p>
                        <p className={styles.date}>
                          Criada em: {account.createdAt}
                        </p>
                      </div>
                      <div className={styles.itemActions}>
                        <button
                          className={styles.editButton}
                          onClick={() => openForm(account)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => deleteItem(account.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "categories" && (
                <div className={styles.itemsGrid}>
                  {categories.map((category) => (
                    <div key={category.id} className={styles.itemCard}>
                      <div className={styles.itemHeader}>
                        <span className={styles.categoryIcon}>
                          {category.icon}
                        </span>
                        <h3>{category.name}</h3>
                      </div>
                      <div className={styles.itemContent}>
                        <span
                          className={styles.categoryColor}
                          style={{ backgroundColor: category.color }}
                        ></span>
                        <p className={styles.categoryType}>{category.type}</p>
                      </div>
                      <div className={styles.itemActions}>
                        <button
                          className={styles.editButton}
                          onClick={() => openForm(category)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => deleteItem(category.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "transactions" && (
                <div className={styles.transactionsList}>
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className={styles.transactionItem}
                    >
                      <div className={styles.transactionInfo}>
                        <h4>{transaction.description}</h4>
                        <p className={styles.transactionDate}>
                          {transaction.date}
                        </p>
                      </div>
                      <div className={styles.transactionAmount}>
                        <span
                          className={
                            transaction.type === "income"
                              ? styles.income
                              : styles.expense
                          }
                        >
                          {transaction.type === "income" ? "+" : "-"} R${" "}
                          {transaction.amount.toFixed(2)}
                        </span>
                      </div>
                      <div className={styles.transactionActions}>
                        <button
                          className={styles.editButton}
                          onClick={() => openForm(transaction)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => deleteItem(transaction.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "budgets" && (
                <div className={styles.itemsGrid}>
                  {budgets.map((budget) => (
                    <div key={budget.id} className={styles.itemCard}>
                      <div className={styles.itemHeader}>
                        <h3>Orçamento {budget.period}</h3>
                        <span className={styles.budgetPeriod}>
                          {budget.period}
                        </span>
                      </div>
                      <div className={styles.itemContent}>
                        <div className={styles.budgetProgress}>
                          <div className={styles.progressBar}>
                            <div
                              className={styles.progressFill}
                              style={{
                                width: `${
                                  (budget.spent / budget.amount) * 100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <p>
                            R$ {budget.spent.toFixed(2)} / R${" "}
                            {budget.amount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className={styles.itemActions}>
                        <button
                          className={styles.editButton}
                          onClick={() => openForm(budget)}
                        >
                          Editar
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => deleteItem(budget.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>

          {/* Modal de formulário */}
          {showForm && (
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <div className={styles.modalHeader}>
                  <h2>
                    {editingItem ? "Editar" : "Adicionar"}{" "}
                    {activeTab === "accounts"
                      ? "Conta"
                      : activeTab === "categories"
                      ? "Categoria"
                      : activeTab === "transactions"
                      ? "Transação"
                      : "Orçamento"}
                  </h2>
                  <button className={styles.closeButton} onClick={closeForm}>
                    ×
                  </button>
                </div>
                <div className={styles.modalContent}>
                  {activeTab === "accounts" && (
                    <form className={styles.form}>
                      <div className={styles.formGroup}>
                        <label>Nome da Conta</label>
                        <input
                          type="text"
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Ex: Conta Corrente"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Saldo Inicial</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.balance || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              balance: e.target.value,
                            })
                          }
                          placeholder="0.00"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Tipo de Conta</label>
                        <select
                          value={formData.type || "checking"}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                        >
                          <option value="checking">Conta Corrente</option>
                          <option value="savings">Poupança</option>
                          <option value="credit">Cartão de Crédito</option>
                        </select>
                      </div>
                    </form>
                  )}
                  {/* Implementar formulários para outras abas */}
                </div>
                <div className={styles.modalActions}>
                  <button className={styles.cancelButton} onClick={closeForm}>
                    Cancelar
                  </button>
                  <button className={styles.saveButton} onClick={saveData}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ExpenseTracker;
