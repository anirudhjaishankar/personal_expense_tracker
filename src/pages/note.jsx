import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { Flex, Box, IconButton, Stack, Text, Input } from "@chakra-ui/react";
import { FiTrash2, FiSave, FiX } from "react-icons/fi";
import { useColorMode } from "@chakra-ui/react";

export function NoteEditorPage({ note = null }) {
	const { colorMode } = useColorMode();

	// Creates a new editor instance.
	const editor = useBlockNote({
		theme: colorMode,
		onEditorContentChange: (e) => {
			// save this in db console.log(e.topLevelBlocks);
		},
	});

	// Renders the editor instance using a React component.
	return (
		<Stack>
			<Flex
				flexDirection="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<Box>
					<Input
						variant="unstyled"
						value={note?.title}
						placeholder="Note Title"
						size="lg"
						fontSize="xx-large"
					/>
				</Box>
				<Flex>
					<Box>
						<IconButton
							aria-label="Save changes"
							icon={<FiSave />}
							colorScheme="blue"
						/>
					</Box>
					<Box ml="1rem">
						<IconButton
							aria-label="Discard changes"
							icon={<FiX />}
							colorScheme="orange"
						/>
					</Box>
					{note && (
						<Box ml="1rem">
							<IconButton
								aria-label="Delete note"
								icon={<FiTrash2 />}
								colorScheme="red"
							/>
						</Box>
					)}
				</Flex>
			</Flex>
			<Flex mb="2rem">
				<Box>
					<Text as="i">{note?.createdAt ?? new Date().toDateString()}</Text>
				</Box>
			</Flex>
			<Box
				h="lg"
				backgroundColor={colorMode === "light" ? "#ddddd" : "#1f1f1f"}
				borderRadius={10}
				pt="1rem"
				pb="1rem"
				mb="2rem"
			>
				<BlockNoteView editor={editor} />
			</Box>
		</Stack>
	);
}
