import {
	Card,
	CardHeader,
	CardBody,
	IconButton,
	Flex,
	Box,
	Switch,
	Stat,
	StatLabel,
	StatNumber,
} from "@chakra-ui/react";
import { FiTrash2, FiEye, FiEdit } from "react-icons/fi";
import PropTypes from "prop-types";

export function BudgetCard({ budget, onActivate, onDelete, onEdit, onView }) {
	return (
		<Card borderRadius={10}>
			<CardHeader>
				<Flex justifyContent="space-between">
					<Box>{budget.name}</Box>
					<Box>
						<Switch
							isChecked={budget.isActive ?? false}
							onChange={() => onActivate(budget.id)}
						/>
					</Box>
				</Flex>
			</CardHeader>
			<CardBody>
				<Flex>
					<Stat>
						<StatLabel>Income</StatLabel>
						<StatNumber>₹ {budget.income}</StatNumber>
					</Stat>
					<Stat>
						<StatLabel>Expense</StatLabel>
						<StatNumber>₹ {budget.expense}</StatNumber>
					</Stat>
				</Flex>
				<Flex justifyContent="end" alignItems="center" mt={4}>
					<IconButton
						variant="ghost"
						icon={<FiEye />}
						onClick={() => onView(budget.id)}
					/>
					<IconButton
						variant="ghost"
						icon={<FiEdit />}
						onClick={() => onEdit(budget.id)}
					/>
					<IconButton
						variant="ghost"
						icon={<FiTrash2 />}
						onClick={() => onDelete(budget.id)}
					/>
				</Flex>
			</CardBody>
		</Card>
	);
}

BudgetCard.propTypes = {
	budget: PropTypes.object.isRequired,
	onActivate: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onView: PropTypes.func.isRequired,
};
