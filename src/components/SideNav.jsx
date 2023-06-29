import {
	IconButton,
	Box,
	CloseButton,
	Flex,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import {
	FiHome,
	FiSettings,
	FiMenu,
	FiFileText,
	FiDollarSign,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { Emoji, EmojiStyle } from "emoji-picker-react";

const LinkItems = [
	{ name: "Transactions", icon: FiHome, route: "/" },
	{ name: "Budgets", icon: FiDollarSign, route: "/budgets" },
	{ name: "Reports", icon: FiFileText, route: "/reports" },
	{ name: "Settings", icon: FiSettings, route: "/settings" },
];

export default function SimpleSidebar({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh">
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	const location = useLocation();
	return (
		<Box
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-evenly">
				<Text fontSize="2xl" fontWeight="bold">
					Spendy
				</Text>
				<Emoji unified="1f911" size="25" emojiStyle={EmojiStyle.Native} />
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem
					key={link.name}
					icon={link.icon}
					route={link.route}
					isActive={link.route === location.pathname}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

const NavItem = ({ isActive, route, icon, children, ...rest }) => {
	return (
		<Link
			href={isActive ? "#" : route}
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				my={2}
				borderRadius="lg"
				role="group"
				cursor="pointer"
				backgroundColor={isActive ? "cyan.800" : "gray.800"}
				_hover={{
					bg: "cyan.400",
					color: "white",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 24 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue("white", "gray.900")}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue("gray.200", "gray.700")}
			justifyContent="flex-start"
			{...rest}
		>
			<IconButton
				variant="outline"
				onClick={onOpen}
				aria-label="open menu"
				icon={<FiMenu />}
			/>

			<Text fontSize="2xl" ml="8" fontWeight="bold">
				Spendy
			</Text>
		</Flex>
	);
};
