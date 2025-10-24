export interface Account {
  _id: string;
  userId: string;
  name: string;
  type: "d" | "c";
  balance: number;
  createdAt: string;
  updatedAt: string;

  save(): Promise<void>;
}

export interface Transaction {
  _id: string;
  userId: string;
  accountId: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  type: "despesa" | "receita";

  save?(): Promise<void>;
}

export interface iBudget {
  _id?: string;
  userId: string;
  categoryId: string;
  amount: number;
  spent: number;
  period: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;

  save(): Promise<void>;
}
export interface Budget extends Partial<iBudget> {}

export interface BudgetsLean {
  _id: object;
  userId: object;
  categoryId: object;
  amount: number;
  spent: number;
  period: string;
  startDate: string;
  endDate: string;
  createdAt: object;
  updatedAt: object;
}

export interface TransactionLean {
  _id: object;
  userId: object;
  accountId: object;
  categoryId: object;
  amount: number;
  description: string;
  date: object;
  type: string;
  createdAt: object;
  updatedAt: object;
}
