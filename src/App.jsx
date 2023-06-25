import {
	Container,
	Flex,
	Heading,
	Divider,
	Button,
	Box,
} from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import "@fontsource/poppins";
import "./App.css";

import { StatsView } from "./components/StatsView";
import { TransactionList } from "./components/TransactionList";

function App() {
	return (
		<Container maxW="6xl">
			<Flex my={4} justifyContent="space-between">
				<Heading>Finance Tracker</Heading>
				<Box>
					<Button leftIcon={<FiPlusCircle />}>Add expense</Button>
				</Box>
			</Flex>
			<Divider />
			<StatsView expense={5000} balance={5000} income={10000} />
			<TransactionList />
		</Container>
	);
}

export default App;
