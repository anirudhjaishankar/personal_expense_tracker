import { Box } from "@chakra-ui/react";
import { TransactionDayCard } from "./TransactionDayCard";
import transactions from "../../transactions";
export function TransactionList() {
	return (
		<Box>
			{Object.keys(transactions).map((date) => (
				<TransactionDayCard
					transactionsByDate={transactions[date]}
					date={date}
					key={date}
				/>
			))}
		</Box>
	);
}
