import { Container, Flex, Heading, Divider, Box } from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";

import "@fontsource/poppins";
import "./App.css";

import { StatsView } from "./components/StatsView";
import { TransactionList } from "./components/TransactionList";
import { CreateTransaction } from "./components/CreateTransaction";
import { getTransactionsByMonthYear } from "./db/transactions";
import { getTotalIncome, getTotalExpense } from "./utils";
import { useState } from "react";
function App() {
	let [income, setIncome] = useState(0);
	let [expense, setExpense] = useState(0);
	const today = new Date();
	const transactions = useLiveQuery(async () => {
		let transactions = await getTransactionsByMonthYear(
			today.getMonth(),
			today.getFullYear()
		);

		setIncome(getTotalIncome(transactions));
		setExpense(getTotalExpense(transactions));
		return transactions;
	}, []);

	return (
		<Container maxW="6xl">
			<Flex my={4} justifyContent="space-between">
				<Heading>Finance Tracker</Heading>
				<Box>
					<CreateTransaction
						addTransaction={(transaction, month, year) => {
							console.log(transaction, month, year);
						}}
					/>
				</Box>
			</Flex>
			<Divider />
			{transactions && <StatsView expense={expense} income={income} />}
			{transactions && <TransactionList transactions={transactions} />}
		</Container>
	);
}

export default App;
