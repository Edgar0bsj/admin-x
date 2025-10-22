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

  save(): Promise<void>;
}
