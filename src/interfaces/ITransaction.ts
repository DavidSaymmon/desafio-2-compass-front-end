export interface ITransaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: Date;
}
