import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TransactionsPage } from "./pages/transactions.jsx";
import { BudgetsPage } from "./pages/budgets.jsx";
import { NewBudgetPage } from "./pages/new-budget.jsx";
import { BudgetItemsPage } from "./pages/budget-items.jsx";
import { NotesPage } from "./pages/notes.jsx";
import { NoteEditorPage } from "./pages/note.jsx";
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
				path: "/budgets/new",
				element: <NewBudgetPage />,
			},
			{
				path: "/budget-items",
				element: <BudgetItemsPage />,
			},
			{
				path: "/reports",
				element: <TransactionsPage />,
			},
			{
				path: "/settings",
				element: <TransactionsPage />,
			},
			{ path: "/notes", element: <NotesPage /> },
			{ path: "/note", element: <NoteEditorPage /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<RouterProvider router={router} />
		</ChakraProvider>
	</React.StrictMode>
);
