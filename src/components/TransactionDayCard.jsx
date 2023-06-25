import {
	Card,
	CardBody,
	CardHeader,
	Flex,
	Box,
	Stack,
	StackDivider,
	Divider,
	Text,
	Badge,
} from "@chakra-ui/react";
export function TransactionDayCard({ transactionsByDate, date }) {
	const expense = transactionsByDate
		.filter((transaction) => transaction.type === "expense")
		.reduce((acc, curr) => acc + curr.amount, 0);
	const income = transactionsByDate
		.filter((transaction) => transaction.type === "income")
		.reduce((acc, curr) => acc + curr.amount, 0);
	return (
		<Card my={2}>
			<CardHeader>
				<Flex justifyContent="space-between">
					<Box>
						<Text fontSize="lg">{date}</Text>
					</Box>
					<Flex>
						{expense !== 0 && (
							<Box mx={1}>
								<Text fontSize="lg">
									Expense{" "}
									<Text as="span" color="red.200">
										{expense}
									</Text>
								</Text>
							</Box>
						)}
						{income !== 0 && (
							<Box mx={1}>
								<Text fontSize="lg">
									Income{" "}
									<Text as="span" color="green.200">
										{income}
									</Text>
								</Text>
							</Box>
						)}
					</Flex>
				</Flex>
			</CardHeader>
			<Divider />
			<CardBody>
				<Stack divider={<StackDivider />}>
					{transactionsByDate.map((transaction) => (
						<Flex justifyContent="space-between" key={transaction.id} m={2}>
							<Box>
								{transaction.name}{" "}
								<Badge variant="subtle">{transaction.label}</Badge>
							</Box>
							<Box
								color={transaction.type === "expense" ? "red.500" : "green.500"}
							>
								{transaction.amount}
							</Box>
						</Flex>
					))}
				</Stack>
			</CardBody>
		</Card>
	);
}
