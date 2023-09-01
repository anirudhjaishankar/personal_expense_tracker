import { Heading, Flex, Box, Button } from "@chakra-ui/react";

export function HabitsPage() {
	return (
		<Flex justifyContent="space-between" alignItems="center" mb="2rem">
			<Heading>Budgets</Heading>
			<Box>
				<Button
					leftIcon={<FiPlusCircle />}
					onClick={() => {
						navigate("/budgets/0");
					}}
				>
					Create Budget
				</Button>
			</Box>
		</Flex>
	);
}
