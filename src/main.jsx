import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TransactionsPage } from "./pages/transactions.jsx";
import { BudgetsPage } from "./pages/budgets.jsx";
import { BudgetCategoriesPage } from "./pages/budget-categories.jsx";
import { NotesPage } from "./pages/notes.jsx";
import { NoteEditorPage } from "./pages/note.jsx";
import { SettingsPage } from "./pages/settings.jsx";
import { EditBudgetPage } from "./pages/edit-budget.jsx";
import { HabitsPage } from "./pages/habits.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <TransactionsPage />,
      },
      {
        path: "/budgets",
        element: <BudgetsPage />,
      },
      {
        path: "/budgets/:budgetId",
        element: <EditBudgetPage />,
      },
      {
        path: "/budget-categories",
        element: <BudgetCategoriesPage />,
      },
      {
        path: "/reports",
        element: <TransactionsPage />,
      },
      { path: "/notes", element: <NotesPage /> },
      { path: "/note", element: <NoteEditorPage /> },
      { path: "/habits", element: <HabitsPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
