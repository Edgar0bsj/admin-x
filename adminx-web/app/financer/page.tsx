"use client";

import React, { useState, useEffect } from "react";
import styles from "@/style/Financer.module.css";
import Layout from "@/components/base/Layout";
import api from "@/services/api";

/**
 * Interfaces e Tipos
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

interface ResTransactionData {
  _id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  type: "despesa" | "receita";
  createdAt: string;
  updatedAt: string;
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

type ActiveTab = "accounts" | "categories" | "transactions" | "budgets";

/**
 * Utilitários e Helpers
 */
const formatDate = (dateString: string): string => {
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

const convertDateFormatForInput = (dateString: string): string => {
  if (!dateString) return new Date().toISOString().split("T")[0];

  if (dateString.includes("/")) {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  return dateString;
};

/**
 * Componentes de UI
 */
const StatsHeader = ({
  totalBalance,
  totalSpent,
  totalBudget,
}: {
  totalBalance: number;
  totalSpent: number;
  totalBudget: number;
}) => (
  <header className={styles.header}>
    <h1 className={styles.title} style={{ paddingTop: "15vh" }}>
      Controle de Gastos
    </h1>
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <h3>Saldo Total</h3>
        <p className={styles.statValue}>R$ {totalBalance.toFixed(2)}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Gastos do Mês</h3>
        <p className={styles.statValue}>R$ {totalSpent.toFixed(2)}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Orçamento Total</h3>
        <p className={styles.statValue}>R$ {totalBudget.toFixed(2)}</p>
      </div>
    </div>
  </header>
);

const TabNavigation = ({
  activeTab,
  onTabChange,
}: {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}) => (
  <nav className={styles.tabNavigation}>
    <button
      className={`${styles.tabButton} ${
        activeTab === "accounts" ? styles.active : ""
      }`}
      onClick={() => onTabChange("accounts")}
    >
      Contas Bancárias
    </button>
    <button
      className={`${styles.tabButton} ${
        activeTab === "categories" ? styles.active : ""
      }`}
      onClick={() => onTabChange("categories")}
    >
      Categorias
    </button>
    <button
      className={`${styles.tabButton} ${
        activeTab === "transactions" ? styles.active : ""
      }`}
      onClick={() => onTabChange("transactions")}
    >
      Transações
    </button>
    <button
      className={`${styles.tabButton} ${
        activeTab === "budgets" ? styles.active : ""
      }`}
      onClick={() => onTabChange("budgets")}
    >
      Orçamentos
    </button>
  </nav>
);

const ActionBar = ({
  activeTab,
  onAddClick,
}: {
  activeTab: ActiveTab;
  onAddClick: () => void;
}) => {
  const getAddButtonText = () => {
    switch (activeTab) {
      case "accounts":
        return "Conta";
      case "categories":
        return "Categoria";
      case "transactions":
        return "Transação";
      case "budgets":
        return "Orçamento";
      default:
        return "Item";
    }
  };

  return (
    <div className={styles.actionBar}>
      <button className={styles.addButton} onClick={onAddClick}>
        + Adicionar {getAddButtonText()}
      </button>
    </div>
  );
};

const AccountCard = ({
  account,
  onEdit,
  onDelete,
}: {
  account: Account;
  onEdit: (account: Account) => void;
  onDelete: (id: string) => void;
}) => (
  <div className={styles.itemCard}>
    <div className={styles.itemHeader}>
      <h3>{account.name}</h3>
      <span className={styles.accountType}>{account.type}</span>
    </div>
    <div className={styles.itemContent}>
      <p className={styles.balance}>R$ {account.balance.toFixed(2)}</p>
      <p className={styles.date}>Criada em: {account.createdAt}</p>
    </div>
    <div className={styles.itemActions}>
      <button className={styles.editButton} onClick={() => onEdit(account)}>
        Editar
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(account.id)}
      >
        Excluir
      </button>
    </div>
  </div>
);

const CategoryCard = ({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}) => (
  <div className={styles.itemCard}>
    <div className={styles.itemHeader}>
      <span className={styles.categoryIcon}>{category.icon}</span>
      <h3>{category.name}</h3>
    </div>
    <div className={styles.itemContent}>
      <span
        className={styles.categoryColor}
        style={{ backgroundColor: category.color }}
      />
      <p className={styles.categoryType}>
        {category.type === "income" ? "Receita" : "Despesa"}
      </p>
    </div>
    <div className={styles.itemActions}>
      <button className={styles.editButton} onClick={() => onEdit(category)}>
        Editar
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(category.id)}
      >
        Excluir
      </button>
    </div>
  </div>
);

const TransactionItem = ({
  transaction,
  onEdit,
  onDelete,
}: {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}) => (
  <div className={styles.transactionItem}>
    <div className={styles.transactionInfo}>
      <h4>{transaction.description}</h4>
      <p className={styles.transactionDate}>{transaction.date}</p>
    </div>
    <div className={styles.transactionAmount}>
      <span
        className={
          transaction.type === "income" ? styles.income : styles.expense
        }
      >
        {transaction.type === "income" ? "+" : "-"} R${" "}
        {transaction.amount.toFixed(2)}
      </span>
    </div>
    <div className={styles.transactionActions}>
      <button className={styles.editButton} onClick={() => onEdit(transaction)}>
        Editar
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(transaction.id)}
      >
        Excluir
      </button>
    </div>
  </div>
);

const BudgetCard = ({
  budget,
  onEdit,
  onDelete,
}: {
  budget: Budget;
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}) => (
  <div className={styles.itemCard}>
    <div className={styles.itemHeader}>
      <h3>Orçamento {budget.period}</h3>
      <span className={styles.budgetPeriod}>{budget.period}</span>
    </div>
    <div className={styles.itemContent}>
      <div className={styles.budgetProgress}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(budget.spent / budget.amount) * 100}%` }}
          />
        </div>
        <p>
          R$ {budget.spent.toFixed(2)} / R$ {budget.amount.toFixed(2)}
        </p>
      </div>
    </div>
    <div className={styles.itemActions}>
      <button className={styles.editButton} onClick={() => onEdit(budget)}>
        Editar
      </button>
      <button
        className={styles.deleteButton}
        onClick={() => onDelete(budget.id)}
      >
        Excluir
      </button>
    </div>
  </div>
);

const FormModal = ({
  showForm,
  activeTab,
  editingItem,
  formData,
  setFormData,
  accounts,
  categories,
  onClose,
  onSave,
}: {
  showForm: boolean;
  activeTab: ActiveTab;
  editingItem: any;
  formData: any;
  setFormData: (data: any) => void;
  accounts: Account[];
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}) => {
  if (!showForm) return null;

  const getModalTitle = () => {
    const action = editingItem ? "Editar" : "Adicionar";
    const itemType = {
      accounts: "Conta",
      categories: "Categoria",
      transactions: "Transação",
      budgets: "Orçamento",
    }[activeTab];
    return `${action} ${itemType}`;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{getModalTitle()}</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.modalContent}>
          {activeTab === "accounts" && (
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nome da Conta *</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: Conta Corrente"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Saldo Inicial *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.balance || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, balance: e.target.value })
                  }
                  placeholder="0.00"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tipo de Conta</label>
                <select
                  value={formData.type || "Débito"}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="Débito">Débito</option>
                  <option value="Crédito">Crédito</option>
                </select>
              </div>
            </form>
          )}

          {activeTab === "categories" && (
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nome da Categoria *</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ex: Alimentação"
                  required
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
                <label>Ícone *</label>
                <input
                  type="text"
                  value={formData.icon || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="Ex: 🍽️"
                  required
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

          {activeTab === "transactions" && (
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label>Conta *</label>
                <select
                  value={formData.accountId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, accountId: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione uma conta</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Categoria *</label>
                <select
                  value={formData.categoryId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Valor *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.amount || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="0.00"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Descrição *</label>
                <input
                  type="text"
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Ex: Supermercado"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Data</label>
                <input
                  type="date"
                  value={formData.date || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
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
        </div>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.saveButton} onClick={onSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Hook personalizado para gerenciar dados da API
 */
const useFinancerData = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

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
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
    }
  };

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
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    }
  };

  const loadTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/financer/transaction/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data as ResTransactionData[];
      const transactionsData = data.map(
        (el) =>
          ({
            id: el._id,
            accountId: el.accountId,
            categoryId: el.categoryId,
            amount: el.amount,
            description: el.description,
            date: formatDate(el.date),
            type: el.type === "receita" ? "income" : "expense",
          } as Transaction)
      );

      setTransactions(transactionsData);
    } catch (error) {
      console.error("Erro ao carregar transações:", error);
    }
  };

  return {
    accounts,
    categories,
    transactions,
    budgets,
    setBudgets,
    loadAccounts,
    loadCategories,
    loadTransactions,
  };
};

/**
 * Hook personalizado para operações CRUD
 */
const useCrudOperations = (
  accounts: Account[],
  categories: Category[],
  transactions: Transaction[],
  loadAccounts: () => void,
  loadCategories: () => void,
  loadTransactions: () => void
) => {
  const saveAccount = async (accountData: Account) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/financer/account/",
        {
          name: accountData.name,
          type: accountData.type,
          balance: accountData.balance,
        },
        { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
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

  const saveTransaction = async (transactionData: Transaction) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/financer/transaction/",
        {
          accountId: transactionData.accountId,
          categoryId: transactionData.categoryId,
          amount: transactionData.amount,
          description: transactionData.description,
          date: transactionData.date,
          type: transactionData.type === "income" ? "receita" : "despesa",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        console.log("Transação criada com sucesso");
        loadTransactions();
      }
      return response;
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      throw error;
    }
  };

  const updateTransaction = async (transactionData: Transaction) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/financer/transaction/${transactionData.id}`,
        {
          accountId: transactionData.accountId,
          categoryId: transactionData.categoryId,
          amount: transactionData.amount,
          description: transactionData.description,
          date: transactionData.date,
          type: transactionData.type === "income" ? "receita" : "despesa",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        console.log("Transação atualizada com sucesso");
        loadTransactions();
      }
      return response;
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      throw error;
    }
  };

  const deleteTransaction = async (transactionId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(
        `/financer/transaction/${transactionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 204) {
        console.log("Transação deletada com sucesso");
        loadTransactions();
      }
      return response;
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
      throw error;
    }
  };

  return {
    saveAccount,
    updateAccount,
    deleteAccount,
    saveCategory,
    updateCategory,
    deleteCategory,
    saveTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

/**
 * Hook personalizado para cálculos
 */
const useCalculations = (
  accounts: Account[],
  transactions: Transaction[],
  budgets: Budget[]
) => {
  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  const getTotalSpent = () => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  const getTotalBudget = () => {
    return budgets.reduce((total, budget) => total + budget.amount, 0);
  };

  return {
    getTotalBalance,
    getTotalSpent,
    getTotalBudget,
  };
};

/**
 * Componente Principal
 */
export default function Financer() {
  // Estados de UI
  const [activeTab, setActiveTab] = useState<ActiveTab>("accounts");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Hooks personalizados
  const {
    accounts,
    categories,
    transactions,
    budgets,
    setBudgets,
    loadAccounts,
    loadCategories,
    loadTransactions,
  } = useFinancerData();

  const {
    saveAccount,
    updateAccount,
    deleteAccount,
    saveCategory,
    updateCategory,
    deleteCategory,
    saveTransaction,
    updateTransaction,
    deleteTransaction,
  } = useCrudOperations(
    accounts,
    categories,
    transactions,
    loadAccounts,
    loadCategories,
    loadTransactions
  );

  const { getTotalBalance, getTotalSpent, getTotalBudget } = useCalculations(
    accounts,
    transactions,
    budgets
  );

  // Inicialização dos dados
  useEffect(() => {
    loadAccounts();
    loadCategories();
    loadTransactions();

    // Dados mock para orçamentos (em desenvolvimento)
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

  // Handlers de formulário
  const openForm = (item?: any) => {
    setEditingItem(item || null);

    if (item && activeTab === "transactions") {
      const formattedData = {
        ...item,
        date: convertDateFormatForInput(item.date),
      };
      setFormData(formattedData);
    } else {
      setFormData(item || {});
    }

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
  };

  const saveData = async () => {
    if (activeTab === "accounts") {
      if (!formData.name || formData.name.trim() === "") {
        alert("O campo nome é obrigatório!");
        return;
      }
      if (!formData.balance || isNaN(parseFloat(formData.balance))) {
        alert("O campo saldo é obrigatório e deve ser um número válido!");
        return;
      }
      const newAccount: Account = {
        id: editingItem?.id || Date.now().toString(),
        name: formData.name.trim(),
        balance: parseFloat(formData.balance),
        type: formData.type || "d",
        createdAt:
          editingItem?.createdAt || new Date().toISOString().split("T")[0],
      };

      try {
        if (editingItem) {
          await updateAccount(newAccount);
        } else {
          await saveAccount(newAccount);
        }
      } catch (error) {
        console.error("Erro ao salvar conta:", error);
      }
    }

    if (activeTab === "categories") {
      if (!formData.name || formData.name.trim() === "") {
        alert("O campo nome é obrigatório!");
        return;
      }
      if (!formData.icon || formData.icon.trim() === "") {
        alert("O campo ícone é obrigatório!");
        return;
      }

      const newCategory: Category = {
        id: editingItem?.id || Date.now().toString(),
        name: formData.name.trim(),
        color: formData.color || "#FF6B6B",
        icon: formData.icon.trim(),
        type: formData.type || "expense",
      };

      try {
        if (editingItem) {
          await updateCategory(newCategory);
        } else {
          await saveCategory(newCategory);
        }
      } catch (error) {
        console.error("Erro ao salvar categoria:", error);
      }
    }

    if (activeTab === "transactions") {
      if (!formData.accountId || formData.accountId.trim() === "") {
        alert("O campo conta é obrigatório!");
        return;
      }
      if (!formData.categoryId || formData.categoryId.trim() === "") {
        alert("O campo categoria é obrigatório!");
        return;
      }
      if (
        !formData.amount ||
        isNaN(parseFloat(formData.amount)) ||
        parseFloat(formData.amount) <= 0
      ) {
        alert(
          "O campo valor é obrigatório e deve ser um número maior que zero!"
        );
        return;
      }
      if (!formData.description || formData.description.trim() === "") {
        alert("O campo descrição é obrigatório!");
        return;
      }

      const newTransaction: Transaction = {
        id: editingItem?.id || Date.now().toString(),
        accountId: formData.accountId,
        categoryId: formData.categoryId,
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        date: formData.date || new Date().toISOString().split("T")[0],
        type: formData.type || "expense",
      };

      try {
        if (editingItem) {
          await updateTransaction(newTransaction);
        } else {
          await saveTransaction(newTransaction);
        }
      } catch (error) {
        console.error("Erro ao salvar transação:", error);
      }
    }

    closeForm();
  };

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

    if (activeTab === "transactions") {
      try {
        await deleteTransaction(id);
      } catch (error) {
        console.error("Erro ao deletar transação:", error);
      }
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <StatsHeader
          totalBalance={getTotalBalance()}
          totalSpent={getTotalSpent()}
          totalBudget={getTotalBudget()}
        />

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <main className={styles.mainContent}>
          <ActionBar activeTab={activeTab} onAddClick={() => openForm()} />

          <div className={styles.itemsList}>
            {activeTab === "accounts" && (
              <div className={styles.itemsGrid}>
                {accounts.map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onEdit={(account) => openForm(account)}
                    onDelete={deleteItem}
                  />
                ))}
              </div>
            )}

            {activeTab === "categories" && (
              <div className={styles.itemsGrid}>
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onEdit={(category) => openForm(category)}
                    onDelete={deleteItem}
                  />
                ))}
              </div>
            )}

            {activeTab === "transactions" && (
              <div className={styles.transactionsList}>
                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onEdit={(transaction) => openForm(transaction)}
                    onDelete={deleteItem}
                  />
                ))}
              </div>
            )}

            {activeTab === "budgets" && (
              <div className={styles.itemsGrid}>
                {budgets.map((budget) => (
                  <BudgetCard
                    key={budget.id}
                    budget={budget}
                    onEdit={(budget) => openForm(budget)}
                    onDelete={deleteItem}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <FormModal
          showForm={showForm}
          activeTab={activeTab}
          editingItem={editingItem}
          formData={formData}
          setFormData={setFormData}
          accounts={accounts}
          categories={categories}
          onClose={closeForm}
          onSave={saveData}
        />
      </div>
    </Layout>
  );
}
