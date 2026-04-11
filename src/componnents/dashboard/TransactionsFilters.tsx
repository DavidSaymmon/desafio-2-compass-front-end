import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";

interface TransactionsFiltersProps {
  searchTerm: string;
  selectedMonth: string;
  availableMonths: string[];
  onCreateTransaction: () => void;
  onSearchTermChange: (value: string) => void;
  onSelectedMonthChange: (value: string) => void;
}

export function TransactionsFilters({
  searchTerm,
  selectedMonth,
  availableMonths,
  onCreateTransaction,
  onSearchTermChange,
  onSelectedMonthChange,
}: TransactionsFiltersProps) {
  return (
    <Grid size={{ xs: 12 }}>
      <Paper sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 5 }}>
            <TextField
              label="Buscar por descrição"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="month-filter-label">Mês</InputLabel>
              <Select
                labelId="month-filter-label"
                label="Mês"
                value={selectedMonth}
                onChange={(event) => onSelectedMonthChange(event.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                {availableMonths.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Button fullWidth variant="contained" onClick={onCreateTransaction}>
              Nova transação
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
