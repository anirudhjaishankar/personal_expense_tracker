import {
  Text,
  Flex,
  Button,
  Icon,
  Box,
  useColorModeValue,
  Input,
  Center,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiArrowLeft, FiCheck, FiPlus, FiMinus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CreateBudgetItem } from "../components/CreateBudgetItem";
import { useEffect, useState } from "react";
import { getAllBudgetItems } from "../db/budgetItems";
import { Emoji } from "emoji-picker-react";

export function CreateEditBudget() {
  let [budgetName, setBudgetName] = useState("New Budget");
  let [expenseItems, setExpenseItems] = useState([]);
  let [incomeItems, setIncomeItems] = useState([]);
  let [currentBudgetItems, setCurrentBudgetItems] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    populateBudgetItems();
  }, []);

  function populateBudgetItems() {
    getAllBudgetItems().then((budgetItems) => {
      if (budgetItems.length !== 0) {
        setExpenseItems(
          budgetItems.filter(
            (i) =>
              i.type === "expense" &&
              !currentBudgetItems.map((item) => item.id).includes(i.id)
          )
        );
        setIncomeItems(
          budgetItems.filter(
            (i) =>
              i.type === "income" &&
              !currentBudgetItems.map((item) => item.id).includes(i.id)
          )
        );
      }
    });
  }

  function addExpenseToCurrentBudget(expenseItem) {
    setCurrentBudgetItems([...currentBudgetItems, expenseItem]);
    setExpenseItems([...expenseItems.filter((i) => i.id !== expenseItem.id)]);
  }

  function addIncomeToCurrentBudget(incomeItem) {
    setCurrentBudgetItems([...currentBudgetItems, incomeItem]);
    setIncomeItems([...incomeItems.filter((i) => i.id !== incomeItem.id)]);
  }
  function removeItemFromCurrentBudget(item) {
    if (item.type === "expense") {
      setExpenseItems([...expenseItems, item]);
    } else {
      setIncomeItems([...incomeItems, item]);
    }
    setCurrentBudgetItems(
      [...currentBudgetItems].filter((i) => i.id !== item.id)
    );
  }
  function onConfirm() {
    let budget = {
      name: budgetName,
      income: getCurrentBudgetTotalIncome(),
      expense: getCurrentBudgetTotalExpense(),
      budgetItems: currentBudgetItems.map((i) => i.id),
    };
    createBudget(budget)
      .then((data) => {
        console.log(data);
        toast({
          title: "Budget created successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/budgets");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Budget creation failed!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  function getCurrentBudgetTotalExpense() {
    return currentBudgetItems
      .filter((i) => i.type === "expense")
      .reduce((acc, cur) => acc + parseInt(cur.amount), 0);
  }

  function getCurrentBudgetTotalIncome() {
    return currentBudgetItems
      .filter((i) => i.type === "income")
      .reduce((acc, cur) => acc + parseInt(cur.amount), 0);
  }

  function getNetTotal() {
    return (
      currentBudgetItems
        .filter((i) => i.type === "income")
        .reduce((acc, cur) => acc + parseInt(cur.amount), 0) -
      currentBudgetItems
        .filter((i) => i.type === "expense")
        .reduce((acc, cur) => acc + parseInt(cur.amount), 0)
    );
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Flex justifyContent="start" alignItems="center" mb={4}>
          <Button
            variant="ghost"
            borderRadius={50}
            onClick={() => {
              navigate("/budgets");
            }}
          >
            <Icon as={FiArrowLeft} boxSize={6} />
          </Button>
          <Input
            ml={2}
            value={budgetName}
            onChange={(e) => {
              setBudgetName(e.target.value);
            }}
          />
        </Flex>
        <CreateBudgetItem onItemCreate={populateBudgetItems} />
      </Flex>
      <Flex justifyContent="space-between">
        <Box
          maxH="80vh"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          w="full"
          h="80vh"
          m={2}
          borderRadius={10}
        >
          <Center
            borderBottom="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            p={2}
            m={2}
          >
            <Text fontSize="lg">Expense Items</Text>
          </Center>
          <Box maxHeight="85%" overflow="scroll" overflowX="hidden">
            {expenseItems?.map((e) => (
              <Flex
                key={e.id}
                m={2}
                p={2}
                justifyContent="space-between"
                alignItems="center"
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                borderRadius="md"
              >
                <Box>
                  <Emoji unified={e.emoji} emojiStyle="native" />
                </Box>
                <Box minW={40}>
                  <Box>
                    <Text fontSize="md">{e.category}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm">{e.amount}</Text>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => {
                      addExpenseToCurrentBudget(e);
                    }}
                    icon={<FiPlus />}
                    colorScheme="blue"
                    borderRadius="full"
                    variant="solid"
                    fontSize="2xl"
                  />
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
        <Box
          maxH="80vh"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          w="full"
          h="80vh"
          m={2}
          borderRadius={10}
        >
          <Center
            borderBottom="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            p={2}
            m={2}
          >
            <Text fontSize="lg">Income Items</Text>
          </Center>
          <Box maxHeight="85%" overflow="scroll" overflowX="hidden">
            {incomeItems?.map((e) => (
              <Flex
                key={e.id}
                m={2}
                p={2}
                justifyContent="space-between"
                alignItems="center"
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                borderRadius="md"
              >
                <Box>
                  <Emoji unified={e.emoji} emojiStyle="native" />
                </Box>
                <Box minW={40}>
                  <Box>
                    <Text fontSize="md">{e.category}</Text>
                  </Box>
                  <Box>
                    <Text fontSize="sm">{e.amount}</Text>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => {
                      addIncomeToCurrentBudget(e);
                    }}
                    icon={<FiPlus />}
                    colorScheme="blue"
                    borderRadius="full"
                    variant="solid"
                    fontSize="2xl"
                  />
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
        <Box
          maxH="80vh"
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.700")}
          w="full"
          h="80vh"
          m={2}
          borderRadius={10}
        >
          <Center
            borderBottom="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
            p={2}
            m={2}
          >
            <Text fontSize="lg">Current Budget</Text>
          </Center>
          <Box maxHeight="70%" overflow="scroll" overflowX="hidden">
            {currentBudgetItems?.map((e) => (
              <Flex
                key={e.id}
                m={2}
                p={2}
                justifyContent="space-between"
                alignItems="center"
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.700")}
                borderRadius="md"
              >
                <Box>
                  <Emoji unified={e.emoji} emojiStyle="native" />
                </Box>
                <Box minW={40}>
                  <Box>
                    <Text fontSize="md">{e.category}</Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize="sm"
                      color={e.type === "expense" ? "red.600" : "green.600"}
                    >
                      {(e.type === "expense" ? "-" : "+") + e.amount}
                    </Text>
                  </Box>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => removeItemFromCurrentBudget(e)}
                    icon={<FiMinus />}
                    colorScheme="blue"
                    borderRadius="full"
                    variant="solid"
                    fontSize="xl"
                  />
                </Box>
              </Flex>
            ))}
          </Box>

          <Box
            m={2}
            p={2}
            borderTop="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <Flex justifyContent="space-between">
              <Box>Total Income</Box>
              <Box
                color={
                  getCurrentBudgetTotalIncome() > 0 ? "green.600" : "white"
                }
              >
                {getCurrentBudgetTotalIncome() > 0 && "+"}
                {getCurrentBudgetTotalIncome()}
              </Box>
            </Flex>
            <Flex justifyContent="space-between">
              <Box>Total Expense</Box>
              <Box
                color={getCurrentBudgetTotalExpense() > 0 ? "red.600" : "white"}
              >
                {getCurrentBudgetTotalExpense() < 0 && "-"}
                {getCurrentBudgetTotalExpense()}
              </Box>
            </Flex>
            <Flex justifyContent="space-between">
              <Box>Net Total</Box>
              <Box
                color={
                  getNetTotal() > 0
                    ? "green.600"
                    : getNetTotal() < 0
                    ? "red.600"
                    : "white"
                }
              >
                {getNetTotal()}
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Flex justifyContent="end">
        <Button leftIcon={<FiCheck />}>Confirm</Button>
      </Flex>
    </Box>
  );
}
