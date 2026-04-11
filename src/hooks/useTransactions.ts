import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../services/transactionsService";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
}
