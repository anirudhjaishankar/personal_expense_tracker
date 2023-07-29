import {
	Box,
	Flex,
	Heading,
	Button,
	Card,
	Text,
	SimpleGrid,
	useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { getAllBudgets, changeActiveBudget, deleteBudget } from "../db/budgets";
import { useLiveQuery } from "dexie-react-hooks";
import { BudgetCard } from "../components/BudgetCard";
import { useEffect } from "react";
export function BudgetsPage() {
	const navigate = useNavigate();
	const toast = useToast();
	let currentActiveBudget;
	const budgets = useLiveQuery(async () => {
		let budgets = await getAllBudgets();
		return budgets;
	}, []);

	useEffect(() => {
		currentActiveBudget = budgets?.find((b) => b.isActive)?.id;
		console.log(currentActiveBudget);
	}, [budgets]);

	function activateBudget(newBudgetId) {
		changeActiveBudget(currentActiveBudget, newBudgetId)
			.then((res) => {
				toast({
					title: "Budget activated!",
					status: "success",
					isClosable: true,
					duration: 5000,
				});
			})
			.catch((err) => {
				toast({
					title: "Failed to activate budget!",
					status: "error",
					isClosable: true,
					duration: 5000,
				});
			});
	}

	function handleDeleteBudget(budgetId) {
		deleteBudget(budgetId)
			.then((res) => {
				toast({
					title: "Budget deleted successfully!",
					status: "success",
					isClosable: true,
					duration: 5000,
				});
			})
			.catch((err) => {
				toast({
					title: "Failed to delete budget!",
					status: "error",
					isClosable: true,
					duration: 5000,
				});
			});
	}

	return (
		<Box>
			<Flex justifyContent="space-between" alignItems="center" mb="2rem">
				<Heading>Budgets</Heading>
				<Box>
					<Button
						leftIcon={<FiPlusCircle />}
						onClick={() => {
							navigate("/budgets/new");
						}}
					>
						Create Budget
					</Button>
				</Box>
			</Flex>
			{budgets?.length !== 0 ? (
				<SimpleGrid columns={3} spacing={4}>
					{budgets?.map((budget) => {
						console.log(budget);
						return (
							<BudgetCard
								key={budget.id}
								budget={budget}
								onActivate={activateBudget}
								onDelete={handleDeleteBudget}
							/>
						);
					})}
				</SimpleGrid>
			) : (
				<Card>
					<Box textAlign="center" py={4} bgColor="gray.700" borderRadius="md">
						<Text>No Budgets found</Text>
					</Box>
				</Card>
			)}
		</Box>
	);
}
