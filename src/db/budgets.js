import db from "./db";

export function createBudget(newBudget) {
	return db.budgets.add(newBudget);
}

export function updateBudget(budget) {
	return db.budgets.put(budget);
}

export function deleteBudget(budgetId) {
	return db.budgets.delete(budgetId);
}

export function getBudgetById(budgetId) {
	return db.budgets.get(budgetId);
}

export function getAllBudgets() {
	return db.table("budgets").toArray();
}

export async function changeActiveBudget(oldId, newId) {
	if (oldId) await db.budgets.update(oldId, { isActive: false });
	return db.budgets.update(newId, { isActive: true });
}
