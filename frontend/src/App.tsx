import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import TransactionCard from "./TransactionCard";
import { useEffect, useState } from "react";

type Profile = {
  name: string;
  balance: number;
};

type Transaction = {
  id: number;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
};

function Dashboard({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="transactions-grid">
      {transactions.map((t) => (
        <TransactionCard key={t.id} transaction={t} />
      ))}
    </div>
  );
}

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileRes, transactionsRes] = await Promise.all([
          fetch("http://localhost:8000/api/profile"),
          fetch("http://localhost:8000/api/transactions"),
        ]);

        if (profileRes.status === 401 || profileRes.status === 403) {
          window.location.href = "/login";
          return;
        }

        const profileData = await profileRes.json();
        const transactionsData = await transactionsRes.json();

        setProfile(profileData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }

    fetchData();
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    try {
      const response = await fetch("http://localhost:8000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        const newTransaction = await response.json();
        setTransactions((prev) => [...prev, newTransaction]);
      }
    } catch (error) {
      console.error("Ошибка добавления:", error);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard transactions={transactions} />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;