import Dexie from "dexie";

export const db = new Dexie("expense-tracker");
db.version(9).stores({
	transactions: "++id, date, amount, category, type",
	budgetItems: "++id, amount, category, type",
	budgets: "++id, name, income, expense",
	notes: "++id, content, createdAt, title",
});

export default db;
