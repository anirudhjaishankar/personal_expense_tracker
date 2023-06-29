export const groupBy = function (data, key) {
	// `data` is an array of objects, `key` is the key (or property accessor) to group by
	// reduce runs this anonymous function on each element of `data` (the `item` parameter,
	// returning the `storage` parameter at the end
	return data.reduce(function (storage, item) {
		// get the first instance of the key by which we're grouping
		var group = item[key];

		// set `storage` for this instance of group to the outer scope (if not empty) or initialize it
		storage[group] = storage[group] || [];

		// add this item to its group within `storage`
		storage[group].push(item);

		// return the updated storage to the reduce function, which will then loop through the next
		return storage;
	}, {}); // {} is the initial value of the storage
};

export const getTotalExpense = (transactions) => {
	return transactions
		.filter((transaction) => {
			return transaction.type === "expense";
		})
		.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
};

export const getTotalIncome = (transactions) => {
	return transactions
		.filter((transaction) => {
			return transaction.type === "income";
		})
		.reduce((acc, curr) => acc + parseInt(curr.amount), 0);
};

export const getMonth = (date) => {
	let currentMonth = date.getMonth() + 1;
	currentMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
	return date.getFullYear() + "-" + currentMonth;
};
