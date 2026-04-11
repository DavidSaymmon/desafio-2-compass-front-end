import type { ITransaction } from "../interfaces/ITransaction";

interface TransactionsSummaryData {
  income: number;
  expenses: number;
  totalBalance: number;
}

export function getTransactionsSummary(
  transactions: ITransaction[],
): TransactionsSummaryData {
  const summary = transactions.reduce(
    (acc, transaction) => ({
      income:
        acc.income + (transaction.type === "income" ? transaction.amount : 0),
      expenses:
        acc.expenses +
        (transaction.type === "expense" ? transaction.amount : 0),
    }),
    { income: 0, expenses: 0 },
  );

  return {
    ...summary,
    totalBalance: summary.income - summary.expenses,
  };
}
