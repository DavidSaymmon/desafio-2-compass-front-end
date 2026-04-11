import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import type { ITransaction } from "../../interfaces/ITransaction";

interface EditTransactionDialogProps {
  open: boolean;
  title: string;
  saveLabel: string;
  description: string;
  amount: string;
  type: ITransaction["type"];
  date: string;
  isSaving: boolean;
  onClose: () => void;
  onSave: () => void;
  onDescriptionChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onTypeChange: (value: ITransaction["type"]) => void;
  onDateChange: (value: string) => void;
}

export function EditTransactionDialog({
  open,
  title,
  saveLabel,
  description,
  amount,
  type,
  date,
  isSaving,
  onClose,
  onSave,
  onDescriptionChange,
  onAmountChange,
  onTypeChange,
  onDateChange,
}: EditTransactionDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Descrição"
              value={description}
              onChange={(event) => onDescriptionChange(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Valor"
              type="number"
              value={amount}
              onChange={(event) => onAmountChange(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel id="edit-type-label">Tipo</InputLabel>
              <Select
                labelId="edit-type-label"
                label="Tipo"
                value={type}
                onChange={(event) =>
                  onTypeChange(event.target.value as ITransaction["type"])
                }
              >
                <MenuItem value="income">Entrada</MenuItem>
                <MenuItem value="expense">Saída</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Data"
              type="date"
              value={date}
              onChange={(event) => onDateChange(event.target.value)}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSaving}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onSave} disabled={isSaving}>
          {saveLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
