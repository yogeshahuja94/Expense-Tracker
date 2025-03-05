import React, { useState } from "react";

interface Expense {
  id: number;
  title: string;
  amount: number;
}

interface ExpenseListProps {
  expenses: { id: number; title: string; amount: number }[];
  onRemoveExpense: (id: number) => void; // Function to delete an expense by its ID
  onEditExpense: (id: number, updatedExpense: Expense) => void; // Function to edit an expense by its ID and new title and amount
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onRemoveExpense,
  onEditExpense,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const handleEditClick = (expense: Expense) => {
    setEditingId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount.toString());
  };

  const handleSave = (id: number) => {
    onEditExpense(id, { id, title: editTitle, amount: parseFloat(editAmount) });
    setEditingId(null);
  };

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Your Expenses</h3>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id} className="flex justify-between border-b py-2">
              {editingId === expense.id ? (
                // Editing Mode
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-1 rounded"
                  />
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="border p-1 rounded"
                  />
                  <button
                    onClick={() => handleSave(expense.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                // Normal View Mode

                <div className="flex justify-between w-full">
                  <span>
                    {expense.title} -{" "}
                    <span className="font-bold text-green-600">
                      ₹{expense.amount.toFixed(2)}
                    </span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(expense)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onRemoveExpense(expense.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
