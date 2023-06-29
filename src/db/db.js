import Dexie from "dexie";

export const db = new Dexie("expense-tracker");
db.version(5).stores({
	transactions: "++id, date, amount, category, type",
	budgetItems: "++id, amount, category, type",
	budgets: "++id, month, year, totalAmount, [month+year]",
	categories: "++id, name, type",
});

export default db;
