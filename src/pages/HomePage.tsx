import { useEffect, useMemo, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { EditTransactionDialog } from "../componnents/dashboard/EditTransactionDialog";
import { TransactionsFilters } from "../componnents/dashboard/TransactionsFilters";
import { TransactionsSummary } from "../componnents/dashboard/TransactionsSummary";
import { TransactionsTable } from "../componnents/dashboard/TransactionsTable";
import { DashboardLayout } from "../componnents/layout/MainLayout";
import { useTransactionEditor } from "../hooks/useTransactionEditor";
import { useTransactionMutations } from "../hooks/useTransactionMutations";
import { useTransactions } from "../hooks/useTransactions";
import { getTransactionsSummary } from "../utils/transactionSummary";

export function HomePage() {
  const { data, isLoading, error } = useTransactions();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const {
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
  } = useTransactionEditor();
  const {
    createTransactionMutation,
    deleteTransactionMutation,
    updateTransactionMutation,
  } = useTransactionMutations(resetEditor);

  const isSavingTransaction =
    createTransactionMutation.isPending || updateTransactionMutation.isPending;

  useEffect(() => {
    if (error) {
      toast.error("Erro ao carregar transações.");
    }
  }, [error]);

  const handleDelete = async (id: number) => {
    await deleteTransactionMutation.mutateAsync(id);
  };

  const handleSaveTransaction = async () => {
    if (!transactionForm) {
      return;
    }

    const normalizedDescription = transactionForm.description.trim();
    const parsedAmount = Number(transactionForm.amount);

    if (
      !normalizedDescription ||
      Number.isNaN(parsedAmount) ||
      parsedAmount <= 0
    ) {
      return;
    }

    const payload = {
      ...transactionForm,
      description: normalizedDescription,
      amount: String(parsedAmount),
    };

    if (formMode === "edit" && transactionForm.id) {
      await updateTransactionMutation.mutateAsync({
        ...payload,
        id: transactionForm.id,
      });
      return;
    }

    await createTransactionMutation.mutateAsync(payload);
  };

  const availableMonths = useMemo(() => {
    const months = new Set(
      (data ?? []).map((transaction) =>
        String(transaction.date.getMonth() + 1).padStart(2, "0"),
      ),
    );

    return Array.from(months).sort();
  }, [data]);

  const filteredTransactions = useMemo(() => {
    return (data ?? []).filter((transaction) => {
      const matchesDescription = transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const transactionMonth = String(transaction.date.getMonth() + 1).padStart(
        2,
        "0",
      );
      const matchesMonth =
        selectedMonth === "all" || transactionMonth === selectedMonth;

      return matchesDescription && matchesMonth;
    });
  }, [data, searchTerm, selectedMonth]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <CircularProgress />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Typography color="error">Erro ao carregar transações.</Typography>
      </DashboardLayout>
    );
  }

  const summary = getTransactionsSummary(filteredTransactions);

  return (
    <DashboardLayout>
      <Grid container spacing={2}>
        <TransactionsSummary
          income={summary.income}
          expenses={summary.expenses}
          totalBalance={summary.totalBalance}
        />

        <TransactionsFilters
          searchTerm={searchTerm}
          selectedMonth={selectedMonth}
          availableMonths={availableMonths}
          onCreateTransaction={openCreator}
          onSearchTermChange={setSearchTerm}
          onSelectedMonthChange={setSelectedMonth}
        />
      </Grid>

      <TransactionsTable
        transactions={filteredTransactions}
        isDeleting={deleteTransactionMutation.isPending}
        isEditing={updateTransactionMutation.isPending}
        onEdit={openEditor}
        onDelete={handleDelete}
      />

      <EditTransactionDialog
        open={!!transactionForm}
        title={formMode === "create" ? "Nova transação" : "Editar transação"}
        saveLabel={formMode === "create" ? "Criar" : "Salvar"}
        description={transactionForm?.description ?? ""}
        amount={transactionForm?.amount ?? ""}
        type={transactionForm?.type ?? "expense"}
        date={transactionForm?.date ?? ""}
        isSaving={isSavingTransaction}
        onClose={() => closeEditor(isSavingTransaction)}
        onSave={handleSaveTransaction}
        onDescriptionChange={updateDescription}
        onAmountChange={updateAmount}
        onTypeChange={updateType}
        onDateChange={updateDate}
      />
    </DashboardLayout>
  );
}
