import {
	Box,
	Heading,
	Flex,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
} from "@chakra-ui/react";
import { useLiveQuery } from "dexie-react-hooks";
import { getAllNotes } from "../db/notes";
import { FiSearch, FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function NotesPage() {
	const navigate = useNavigate();
	const notes = useLiveQuery(async () => {
		return await getAllNotes();
	}, []);

	return (
		<Box>
			<Heading mb="2rem">Notes</Heading>
			<Flex justifyContent="space-between" alignItems="center" mb={4}>
				<Box w="md">
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<FiSearch color="gray.300" />
						</InputLeftElement>
						<Input variant="filled" type="text" placeholder="Title" />
					</InputGroup>
				</Box>
				<Box>
					<Button
						leftIcon={<FiPlusCircle />}
						onClick={() => {
							navigate("/note");
						}}
					>
						New Note
					</Button>
				</Box>
			</Flex>
			{notes?.length}
		</Box>
	);
}
