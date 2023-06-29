import Dexie from "dexie";

export const db = new Dexie("expense-tracker");
db.version(6).stores({
	transactions: "++id, date, amount, category, type",
	budgetItems: "++id, amount, category, type",
	budgets: "++id, month, year, income, expense, [month+year]",
	categories: "++id, name, type",
});

export default db;
