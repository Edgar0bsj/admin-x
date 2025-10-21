"use client";

import React, { useState, useEffect } from "react";
import styles from "@/style/Financer.module.css";
import Layout from "@/components/base/Layout";
import api from "@/services/api";

/**
 * Interfaces
 */
interface ResAccData {
  _id: string;
  userId: string;
  name: string;
  type: "c" | "d";
  balance: number;
  createdAt: string;
  updatedAt: string;
}

interface Account {
  id: string;
  name: string;
  balance: number;
  type: "Débito" | "Crédito";
  createdAt: string;
}

interface ResCategoryData {
  _id: string;
  userId: string;
  name: string;
  color: string;
  icon: string;
  type: "despesa" | "receita";
  createdAt: string;
  updatedAt: string;
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

export default function financer() {
  // Estados principais
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [formData, setFormData] = useState<any>({});

  // Estados para controlar formulários
  const [activeTab, setActiveTab] = useState<
    "accounts" | "categories" | "transactions" | "budgets"
  >("accounts");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  /**
   * Formata data para exibição visual
   */
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return dateString;
    }
  };

  /**
   * Carrega dados das contas da API
   */
  const loadAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/financer/account/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data as ResAccData[];
      const accountsData = data.map(
        (el) =>
          ({
            id: el._id,
            name: el.name,
            balance: el.balance,
            type: el.type === "c" ? "Crédito" : "Débito",
            createdAt: formatDate(el.updatedAt),
          } as Account)
      );

      setAccounts(accountsData);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    }
  };

  /**
   * Carrega dados das categorias da API
   */
  const loadCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/financer/category/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data as ResCategoryData[];
      const categoriesData = data.map(
        (el) =>
          ({
            id: el._id,
            name: el.name,
            color: el.color,
            icon: el.icon,
            type: el.type === "receita" ? "income" : "expense",
          } as Category)
      );

      setCategories(categoriesData);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  /**
   * Inicializa dados ao carregar o componente
   */
  useEffect(() => {
    // Carrega dados da API
    loadAccounts();
    loadCategories();

    //EM DESENVOLVIMENTO
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

    //EM DESENVOLVIMENTO
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
   * Salva uma nova conta via API
   */
  const saveAccount = async (accountData: Account) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/financer/account/",
        {
          name: accountData.name,
          type: accountData.type === "Crédito" ? "c" : "d",
          balance: accountData.balance,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        console.log("Conta criada com sucesso");
        loadAccounts();
      }
      return response;
    } catch (error) {
      console.error("Erro ao salvar conta:", error);
      throw error;
    }
  };

  /**
   * Atualiza uma conta existente via API
   */
  const updateAccount = async (accountData: Account) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/financer/account/${accountData.id}`,
        {
          name: accountData.name,
          type: accountData.type === "Crédito" ? "c" : "d",
          balance: accountData.balance,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        console.log("Conta atualizada com sucesso");
        loadAccounts();
      }
      return response;
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);
      throw error;
    }
  };

  /**
   * Deleta uma conta via API
   */
  const deleteAccount = async (accountId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/financer/account/${accountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204) {
        console.log("Conta deletada com sucesso");
        loadAccounts();
      }
      return response;
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      throw error;
    }
  };

  /**
   * Salva uma nova categoria via API
   */
  const saveCategory = async (categoryData: Category) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/financer/category/",
        {
          name: categoryData.name,
          color: categoryData.color,
          icon: categoryData.icon,
          type: categoryData.type === "income" ? "receita" : "despesa",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        console.log("Categoria criada com sucesso");
        loadCategories();
      }
      return response;
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      throw error;
    }
  };

  /**
   * Atualiza uma categoria existente via API
   */
  const updateCategory = async (categoryData: Category) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/financer/category/${categoryData.id}`,
        {
          name: categoryData.name,
          color: categoryData.color,
          icon: categoryData.icon,
          type: categoryData.type === "income" ? "receita" : "despesa",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        console.log("Categoria atualizada com sucesso");
        loadCategories();
      }
      return response;
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      throw error;
    }
  };

  /**
   * Deleta uma categoria via API
   */
  const deleteCategory = async (categoryId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/financer/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204) {
        console.log("Categoria deletada com sucesso");
        loadCategories();
      }
      return response;
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      throw error;
    }
  };

  /**
   * Função para salvar dados (criar ou editar)
   */
  const saveData = async () => {
    if (activeTab === "accounts") {
      const newAccount: Account = {
        id: editingItem?.id || Date.now().toString(),
        name: formData.name || "",
        balance: parseFloat(formData.balance) || 0,
        type: formData.type || "d",
        createdAt:
          editingItem?.createdAt || new Date().toISOString().split("T")[0],
      };

      try {
        if (editingItem) {
          // Se está editando, usa updateAccount
          await updateAccount(newAccount);
        } else {
          // Se está criando, usa saveAccount
          await saveAccount(newAccount);
        }
      } catch (error) {
        console.error("Erro ao salvar conta:", error);
      }
    }

    if (activeTab === "categories") {
      const newCategory: Category = {
        id: editingItem?.id || Date.now().toString(),
        name: formData.name || "",
        color: formData.color || "#FF6B6B",
        icon: formData.icon || "📝",
        type: formData.type || "expense",
      };

      try {
        if (editingItem) {
          // Se está editando, usa updateCategory
          await updateCategory(newCategory);
        } else {
          // Se está criando, usa saveCategory
          await saveCategory(newCategory);
        }
      } catch (error) {
        console.error("Erro ao salvar categoria:", error);
      }
    }

    // Implementar lógica similar para outras abas
    closeForm();
  };

  /**
   * Função para deletar item
   */
  const deleteItem = async (id: string) => {
    if (activeTab === "accounts") {
      try {
        await deleteAccount(id);
      } catch (error) {
        console.error("Erro ao deletar conta:", error);
      }
    }

    if (activeTab === "categories") {
      try {
        await deleteCategory(id);
      } catch (error) {
        console.error("Erro ao deletar categoria:", error);
      }
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

  //=================================================================
  return (
    <>
      <Layout>
        <div className={styles.container}>
          {/* Header com estatísticas */}
          <header className={styles.header}>
            <h1 className={styles.title} style={{ paddingTop: "15vh" }}>
              Controle de Gastos
            </h1>
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
            {/* ========================  accounts =========================================== */}
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
                          <option value="d">Débito</option>
                          <option value="c">Crédito</option>
                        </select>
                      </div>
                    </form>
                  )}

                  {activeTab === "categories" && (
                    <form className={styles.form}>
                      <div className={styles.formGroup}>
                        <label>Nome da Categoria</label>
                        <input
                          type="text"
                          value={formData.name || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Ex: Alimentação"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Cor</label>
                        <input
                          type="color"
                          value={formData.color || "#FF6B6B"}
                          onChange={(e) =>
                            setFormData({ ...formData, color: e.target.value })
                          }
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Ícone</label>
                        <input
                          type="text"
                          value={formData.icon || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, icon: e.target.value })
                          }
                          placeholder="Ex: 🍽️"
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label>Tipo</label>
                        <select
                          value={formData.type || "expense"}
                          onChange={(e) =>
                            setFormData({ ...formData, type: e.target.value })
                          }
                        >
                          <option value="expense">Despesa</option>
                          <option value="income">Receita</option>
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
}
