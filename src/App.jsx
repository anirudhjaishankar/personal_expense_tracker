import { Container, Flex, Heading, Divider, Box } from "@chakra-ui/react";

import "@fontsource/poppins";
import "./App.css";

import { StatsView } from "./components/StatsView";
import { TransactionList } from "./components/TransactionList";
import { CreateTransaction } from "./components/CreateTransaction";
function App() {
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
			<StatsView expense={5000} balance={5000} income={10000} />
			<TransactionList />
		</Container>
	);
}

export default App;
