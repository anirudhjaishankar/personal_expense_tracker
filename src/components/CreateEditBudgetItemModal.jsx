/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	FormControl,
	FormLabel,
	Input,
	Select,
	useToast,
	Center,
} from "@chakra-ui/react";
import EmojiPicker, { Emoji } from "emoji-picker-react";

export function CreateEditBudgetItemModal({
	isEdit = false,
	onItemAction,
	budgetItem = null,
	onClose,
}) {
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [category, setCategory] = useState("");
	const [type, setType] = useState("expense");
	const [amount, setAmount] = useState("");
	const [emoji, setEmoji] = useState("1f4b8");
	const toast = useToast();

	useEffect(() => {
		setEditForm();
	}, []);
	const handleAction = () => {
		if (category.length === 0 || amount.length === 0) {
			toast({
				title: "Fill all required fields",
				description: "Fields marked with * are required",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		} else {
			let currentBudgetItem = {
				emoji,
				type,
				category,
				amount,
			};
			if (isEdit) {
				currentBudgetItem.id = budgetItem.id;
			}
			onItemAction(currentBudgetItem);
			onClose();
		}
	};

	function setEditForm() {
		setEmoji(budgetItem.emoji);
		setType(budgetItem.type);
		setAmount(budgetItem.amount);
		setCategory(budgetItem.category);
	}

	const resetForm = () => {
		if (isEdit) {
			setEditForm();
		}
		setType("expense");
		setCategory("");
		setAmount("");
		setEmoji("1f4b8");
	};

	const onEmojiSelect = (emojiData, e) => {
		setEmoji(emojiData.unified);
		setIsEmojiPickerOpen(false);
	};

	return (
		<>
			<Modal isOpen>
				<ModalOverlay />
				<ModalContent my={4}>
					<ModalHeader>{isEdit ? "Edit" : "Create"} Budget Item</ModalHeader>
					<ModalCloseButton
						onClick={() => {
							onClose();
							resetForm();
						}}
					/>
					<ModalBody>
						<Center onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}>
							<Emoji unified={emoji} emojiStyle="native" />
						</Center>
						{isEmojiPickerOpen && (
							<Center mt={5}>
								<EmojiPicker onEmojiClick={onEmojiSelect} emojiStyle="native" />
							</Center>
						)}
						<FormControl isRequired my={2}>
							<FormLabel>Category</FormLabel>
							<Input
								type="text"
								value={category}
								onChange={(e) => {
									setCategory(e.target.value);
								}}
							/>
						</FormControl>
						<FormControl isRequired my={2}>
							<FormLabel>Amount</FormLabel>
							<Input
								type="number"
								value={amount}
								onChange={(e) => {
									setAmount(e.target.value);
								}}
							/>
						</FormControl>
						<FormControl my={2}>
							<FormLabel>Type</FormLabel>
							<Select
								variant="filled"
								value={type}
								onChange={(e) => {
									setType(e.target.value);
								}}
							>
								<option value="expense">Expense</option>
								<option value="income">Income</option>
							</Select>
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={handleAction}>
							{isEdit ? "Edit" : "Add"}
						</Button>
						<Button
							variant="ghost"
							onClick={() => {
								onClose();
								resetForm();
							}}
						>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
