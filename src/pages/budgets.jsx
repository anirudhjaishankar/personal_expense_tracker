import {
	Box,
	Flex,
	Heading,
	Input,
	TableContainer,
	Table,
	Thead,
	Tbody,
	Th,
	Tr,
	Td,
} from "@chakra-ui/react";
import { Emoji } from "emoji-picker-react";
import { useState } from "react";
import { getMonth } from "../utils";
import { StatsView } from "../components/StatsView";

export function BudgetsPage() {
	const today = new Date();
	let [selectedMonth, setSelectedMonth] = useState(getMonth(today));
	return (
		<Box>
			<Flex justifyContent="space-between" alignItems="center" mb="2rem">
				<Heading>Budgets</Heading>
				<Box>
					<Input
						type="month"
						value={selectedMonth}
						onChange={(e) => setSelectedMonth(e.target.value)}
					/>
				</Box>
			</Flex>
			<StatsView income={115000} expense={115000} isBudget={true} />
			<TableContainer>
				<Table variant="simple">
					<Thead>
						<Tr>
							<Th>Category</Th>
							<Th>Type</Th>
							<Th isNumeric>Amount</Th>
						</Tr>
					</Thead>
					<Tbody>
						<Tr>
							<Td>
								<Flex alignItems="center">
									<Emoji unified="1f34a" /> Food
								</Flex>
							</Td>
							<Td>Expense</Td>
							<Td isNumeric>{5000}</Td>
						</Tr>
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
}
