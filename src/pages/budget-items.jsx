import {
	Box,
	Flex,
	Heading,
	TableContainer,
	Table,
	Thead,
	Tbody,
	Th,
	Tr,
	Td,
	Text,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	useToast,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import { Emoji } from "emoji-picker-react";
import {
	getAllBudgetItems,
	createBudgetItem,
	updateBudgetItem,
	deleteBudgetItem,
} from "../db/budgetItems";
import { useState, useEffect } from "react";
import { FiMoreVertical, FiPlusCircle } from "react-icons/fi";
import { CreateEditBudgetItemModal } from "../components/CreateEditBudgetItemModal";

export function BudgetItemsPage() {
	const [budgetItems, setBudgetItems] = useState();
	const [actionType, setActionType] = useState();
	const [currentBudgetItem, setCurrentBudgetItem] = useState();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		populateBudgetItems();
	}, []);

	function populateBudgetItems() {
		getAllBudgetItems().then((budgetItems) => {
			setBudgetItems(budgetItems);
		});
	}

	function onEditBudgetItem(updatedBudgetItem) {
		console.log(updatedBudgetItem);
		updateBudgetItem(updatedBudgetItem)
			.then((res) => {
				toast({
					title: "Budget item edited",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				populateBudgetItems();
			})
			.catch((err) => console.log(err));
	}

	function onAddBudgetItem(newBudgetItem) {
		createBudgetItem(newBudgetItem)
			.then((res) => {
				toast({
					title: "Budget item added",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				populateBudgetItems();
			})
			.catch((err) => console.log(err));
	}

	function onDeleteBudgetItem(id) {
		deleteBudgetItem(id)
			.then((res) => {
				toast({
					title: "Budget item deleted",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				populateBudgetItems();
			})
			.catch((err) => console.log(err));
	}

	function displayEditBudgetItemModal(budgetItem) {
		console.log("edit");
		onOpen();
		setActionType("edit");
		setCurrentBudgetItem(budgetItem);
	}

	function displayAddBudgetItemModal() {
		console.log("add");
		onOpen();
		setActionType("add");
		setCurrentBudgetItem();
	}

	return (
		<Box>
			{isOpen && (
				<CreateEditBudgetItemModal
					isEdit={actionType === "edit"}
					onItemAction={
						actionType === "add" ? onAddBudgetItem : onEditBudgetItem
					}
					budgetItem={currentBudgetItem}
					onClose={onClose}
				/>
			)}
			<Flex justifyContent="space-between" alignItems="center" mb="2rem">
				<Heading>Budget Items</Heading>
				<Box>
					<Button
						onClick={displayAddBudgetItemModal}
						leftIcon={<FiPlusCircle />}
					>
						Add Item
					</Button>
				</Box>
			</Flex>
			{budgetItems && (
				<TableContainer>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>Category</Th>
								<Th>Type</Th>
								<Th isNumeric>Amount</Th>
								<Th isNumeric>Menu</Th>
							</Tr>
						</Thead>
						<Tbody>
							{budgetItems &&
								budgetItems.map((budgetItem) => (
									<Tr key={budgetItem.id}>
										<Td>
											<Flex alignItems="center">
												<Emoji unified={budgetItem.emoji} />
												<Text ml={2}>{budgetItem.category}</Text>
											</Flex>
										</Td>
										<Td>{budgetItem.type}</Td>
										<Td isNumeric>{budgetItem.amount}</Td>
										<Td isNumeric>
											<Menu>
												<MenuButton
													as={IconButton}
													icon={<FiMoreVertical />}
													variant="ghost"
												/>
												<MenuList>
													<MenuItem
														onClick={() => {
															displayEditBudgetItemModal(budgetItem);
														}}
													>
														Edit
													</MenuItem>
													<MenuItem
														onClick={() => {
															onDeleteBudgetItem(budgetItem.id);
														}}
													>
														Delete
													</MenuItem>
												</MenuList>
											</Menu>
										</Td>
									</Tr>
								))}
						</Tbody>
					</Table>
				</TableContainer>
			)}
		</Box>
	);
}
