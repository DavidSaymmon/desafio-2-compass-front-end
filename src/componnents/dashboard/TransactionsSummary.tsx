import { Card, CardContent, Grid, Typography } from "@mui/material";

interface TransactionsSummaryProps {
  income: number;
  expenses: number;
  totalBalance: number;
}

export function TransactionsSummary({
  income,
  expenses,
  totalBalance,
}: TransactionsSummaryProps) {
  const summaryCards = [
    { label: "Entradas", value: income, color: "green" },
    { label: "Saídas", value: expenses, color: "red" },
    {
      label: "Saldo Total",
      value: totalBalance,
      color: totalBalance >= 0 ? "green" : "red",
    },
  ];

  return (
    <>
      {summaryCards.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={card.label}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {card.label}
              </Typography>
              <Typography variant="h5" sx={{ color: card.color }}>
                R$ {card.value.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
}
