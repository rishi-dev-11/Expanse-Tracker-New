import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
console.log("API URL:", apiUrl);

export default function Expense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentExpense, setCurrentExpense] = useState({});

  // ✅ Fetch expenses from API
  const fetchExpenses = () => {
    axios
      .get(`${apiUrl}/get`)
      .then((result) => {
        console.log("Successfully fetched data");
        setExpenses(result.data);
      })
      .catch((err) => console.error("Error fetching expenses:", err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    console.log("Calling API...");

    if (edit) {
      axios
        .put(`${apiUrl}/update/${currentExpense._id}`, { amount })
        .then(() => {
          console.log("Edited successfully");
          setEdit(false);
          setTitle("");
          setAmount(0);
          fetchExpenses(); // ✅ Refresh list
        })
        .catch(() => console.log("Failed to edit"));
    } else {
      axios
        .post(`${apiUrl}/add`, { title, amount })
        .then(() => {
          console.log("Successfully added");
          setTitle("");
          setAmount(0);
          fetchExpenses(); // ✅ Refresh list
        })
        .catch(() => console.log("Failed to add"));
    }
  };

  const handleEdit = (expense) => {
    setTitle(expense.title);
    setAmount(expense.amount);
    setEdit(true);
    setCurrentExpense(expense);
  };

  const handleDelete = (expense) => {
    axios
      .delete(`${apiUrl}/delete/${expense._id}`) // ✅ Removed space in URL
      .then(() => {
        console.log("Successfully deleted");
        fetchExpenses(); // ✅ Refresh list
      })
      .catch(() => console.log("Failed to delete"));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Title */}
          <h2 className="text-center mb-4">Expense Tracker</h2>

          {/* Add Expense Form */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <form onSubmit={addExpense}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Expense Title
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill px-3"
                    id="title"
                    placeholder="e.g., Groceries"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control rounded-pill px-3"
                    id="amount"
                    placeholder="e.g., 500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} // ✅ Convert to number
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 rounded-pill"
                >
                  {edit ? "Update Expense" : "Add Expense"}
                </button>
              </form>
            </div>
          </div>

          {/* Expense List */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-3">Your Expenses</h5>

              <ul className="list-group">
                {expenses.length !== 0 ? (
                  expenses.map((expense) => (
                    <li
                      className="list-group-item d-flex align-items-center justify-content-between"
                      key={expense._id}
                    >
                      <div className="flex-grow-1">
                        <strong>{expense.title}</strong>
                      </div>

                      <div
                        className="text-muted text-center"
                        style={{ width: "120px" }}
                      >
                        ₹ {expense.amount}
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(expense)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(expense)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="list-group-item text-center text-muted">
                    No expenses added yet.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
