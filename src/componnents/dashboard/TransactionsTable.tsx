import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { ITransaction } from "../../interfaces/ITransaction";

interface TransactionsTableProps {
  transactions: ITransaction[];
  isDeleting: boolean;
  isEditing: boolean;
  onEdit: (transaction: ITransaction) => void;
  onDelete: (id: number) => void;
}

export function TransactionsTable({
  transactions,
  isDeleting,
  isEditing,
  onEdit,
  onDelete,
}: TransactionsTableProps) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow
            sx={(theme) => ({
              backgroundColor:
                theme.palette.mode === "dark" ? "#181f2a" : "#f5f5f5",
            })}
          >
            <TableCell>Descrição</TableCell>
            <TableCell align="right">Quantia</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Data</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} hover>
              <TableCell>{transaction.description}</TableCell>
              <TableCell align="right">
                R$ {transaction.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <span
                  style={{
                    color: transaction.type === "income" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {transaction.type === "income" ? "Entrada" : "Saída"}
                </span>
              </TableCell>
              <TableCell>
                {transaction.date.toLocaleDateString("pt-BR")}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  disabled={isEditing}
                  onClick={() => onEdit(transaction)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  disabled={isDeleting}
                  onClick={() => onDelete(transaction.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
