import Dexie from "dexie";

export const db = new Dexie("expense-tracker");
db.version(7).stores({
	transactions: "++id, date, amount, category, type",
	budgetItems: "++id, amount, category, type",
	budgets: "++id, name, income, expense",
});

export default db;
