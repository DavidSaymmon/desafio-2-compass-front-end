import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createTransaction,
  deleteTransaction,
  updateTransaction,
  type CreateTransactionPayload,
  type EditTransactionPayload,
} from "../services/transactionsService";

export function useTransactionMutations(onMutationSuccess: () => void) {
  const queryClient = useQueryClient();

  const createTransactionMutation = useMutation({
    mutationFn: (transaction: CreateTransactionPayload) =>
      createTransaction(transaction),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transação criada com sucesso.");
      onMutationSuccess();
    },
    onError: () => {
      toast.error("Erro ao criar transação.");
    },
  });

  const deleteTransactionMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transação deletada com sucesso.");
    },
    onError: () => {
      toast.error("Erro ao deletar transação.");
    },
  });

  const updateTransactionMutation = useMutation({
    mutationFn: (transaction: EditTransactionPayload) =>
      updateTransaction(transaction),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success("Transação editada com sucesso.");
      onMutationSuccess();
    },
    onError: () => {
      toast.error("Erro ao editar transação.");
    },
  });

  return {
    createTransactionMutation,
    deleteTransactionMutation,
    updateTransactionMutation,
  };
}
