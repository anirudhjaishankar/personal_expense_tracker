import { Box } from "@chakra-ui/react";
import { TransactionDayCard } from "./TransactionDayCard";
import { groupBy } from "../utils";

export function TransactionList({ transactions }) {
	const transactionsByDate = transactions ? groupBy(transactions, "date") : [];
	return (
		<Box>
			{transactionsByDate &&
				Object.keys(transactionsByDate).map((date) => (
					<TransactionDayCard
						transactionsByDate={transactionsByDate[date]}
						date={date}
						key={date}
					/>
				))}
		</Box>
	);
}
