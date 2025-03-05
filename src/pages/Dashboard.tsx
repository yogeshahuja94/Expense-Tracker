import React, { useState } from "react";
import ExpenseForm from "../components/ui/ExpenseForm";
import ExpenseList from "../components/ui/ExpenseList";

interface Expense {
  id: number;
  title: string;
  amount: number;
}

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (title: string, amount: number) => {
    const newExpense = { id: Date.now(), title, amount };
    setExpenses([...expenses, newExpense]);
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (id: number, updatedExpense: Expense) => {
    setExpenses(
      expenses.map((expense) => (expense.id === id ? updatedExpense : expense))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Expense Dashboard</h2>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpenseList
        expenses={expenses}
        onRemoveExpense={removeExpense}
        onEditExpense={editExpense}
      />
    </div>
  );
};

export default Dashboard;
