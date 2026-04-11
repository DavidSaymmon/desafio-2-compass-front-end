import axios from "axios";
import type { ITransaction } from "../interfaces/ITransaction";

const JSON_SERVER_URL = "http://localhost:3001";

export interface CreateTransactionPayload {
  description: string;
  amount: string;
  type: ITransaction["type"];
  date: string;
}

export interface EditTransactionPayload {
  id: number;
  description: string;
  amount: string;
  type: ITransaction["type"];
  date: string;
}

export async function fetchTransactions() {
  const response = await axios.get<ITransaction[]>(
    `${JSON_SERVER_URL}/transactions`,
  );

  return response.data.map((transaction) => ({
    ...transaction,
    date: new Date(transaction.date),
  }));
}

export async function deleteTransaction(id: number) {
  await axios.delete(`${JSON_SERVER_URL}/transactions/${id}`);
}

export async function createTransaction(transaction: CreateTransactionPayload) {
  await axios.post(`${JSON_SERVER_URL}/transactions`, {
    description: transaction.description.trim(),
    amount: Number(transaction.amount),
    type: transaction.type,
    date: transaction.date,
  });
}

export async function updateTransaction(transaction: EditTransactionPayload) {
  await axios.patch(`${JSON_SERVER_URL}/transactions/${transaction.id}`, {
    description: transaction.description.trim(),
    amount: Number(transaction.amount),
    type: transaction.type,
    date: transaction.date,
  });
}
