export interface Account {
  _id: string;
  userId: string;
  name: string;
  type: "d" | "c";
  balance: number;
  createdAt: string;
  updatedAt: string;

  save(): void;
}
