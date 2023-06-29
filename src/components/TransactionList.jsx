import { Box, Text } from "@chakra-ui/react";
import { TransactionGroupCard } from "./TransactionGroupCard";
import { groupBy } from "../utils";

export function TransactionList({ transactions, groupByValue }) {
	const transactionsByDate = transactions
		? groupBy(transactions, groupByValue)
		: [];
	return (
		<Box>
			{transactions.length === 0 && (
				<Box textAlign="center" py={4} bgColor="gray.700" borderRadius="md">
					<Text>No Transactions found</Text>
				</Box>
			)}
			{transactionsByDate &&
				Object.keys(transactionsByDate).map((group) => (
					<TransactionGroupCard
						transactionsByDate={transactionsByDate[group]}
						isDate={groupByValue === "date"}
						group={group}
						key={group}
					/>
				))}
		</Box>
	);
}
