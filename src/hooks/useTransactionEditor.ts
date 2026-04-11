import { useState } from "react";
import type { ITransaction } from "../interfaces/ITransaction";

export interface TransactionFormState {
  id?: number;
  description: string;
  amount: string;
  type: ITransaction["type"];
  date: string;
}

export type TransactionFormMode = "create" | "edit";

function formatDateForInput(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function useTransactionEditor() {
  const [formMode, setFormMode] = useState<TransactionFormMode | null>(null);
  const [transactionForm, setTransactionForm] =
    useState<TransactionFormState | null>(null);

  const openCreator = () => {
    setFormMode("create");
    setTransactionForm({
      description: "",
      amount: "",
      type: "expense",
      date: formatDateForInput(new Date()),
    });
  };

  const openEditor = (transaction: ITransaction) => {
    setFormMode("edit");
    setTransactionForm({
      id: transaction.id,
      description: transaction.description,
      amount: String(transaction.amount),
      type: transaction.type,
      date: formatDateForInput(transaction.date),
    });
  };

  const closeEditor = (isSaving: boolean) => {
    if (isSaving) {
      return;
    }

    setFormMode(null);
    setTransactionForm(null);
  };

  const resetEditor = () => {
    setFormMode(null);
    setTransactionForm(null);
  };

  const updateDescription = (value: string) => {
    setTransactionForm((current) =>
      current ? { ...current, description: value } : current,
    );
  };

  const updateAmount = (value: string) => {
    setTransactionForm((current) =>
      current ? { ...current, amount: value } : current,
    );
  };

  const updateType = (value: ITransaction["type"]) => {
    setTransactionForm((current) =>
      current ? { ...current, type: value } : current,
    );
  };

  const updateDate = (value: string) => {
    setTransactionForm((current) =>
      current ? { ...current, date: value } : current,
    );
  };

  return {
    formMode,
    transactionForm,
    openCreator,
    openEditor,
    closeEditor,
    resetEditor,
    updateDescription,
    updateAmount,
    updateType,
    updateDate,
  };
}
