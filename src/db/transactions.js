import db from "./db";

export function getTransactionsByMonthYear(month, year) {
	let monthStart = new Date(year, month, 1);
	let monthEnd = new Date(year, month + 1, 0);

	return db.transactions
		.where("date")
		.between(
			monthStart.toLocaleDateString("en-GB"),
			monthEnd.toLocaleDateString("en-GB"),
			true,
			true
		)
		.toArray();
}

export function createTransaction(newTransaction) {
	return db.transactions.add(newTransaction);
}
