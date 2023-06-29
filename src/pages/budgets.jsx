import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { useState } from "react";
import { getMonth } from "../utils";

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
		</Box>
	);
}
