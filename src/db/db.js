import Dexie from "dexie";

export const db = new Dexie("expense-tracker");
db.version(2).stores({
	transactions: "++id, date, amount, category, type",
	budgets: "++id, date, amount, category, type",
	categories: "++id, name, type",
});

export default db;
