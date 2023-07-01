import {
  Box,
  Heading,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { getTransactionsByMonthYear } from "../db/transactions";
import { getTotalExpense, getTotalIncome } from "../utils";
import { StatsView } from "../components/statsView";
import { TransactionList } from "../components/TransactionList";
import { CreateTransaction } from "../components/CreateTransaction";
import { getMonth } from "../utils";
import { warning } from "framer-motion";

export function TransactionsPage() {
  const today = new Date();
  let toast = useToast();
  useEffect(() => {
    let activeBudget = localStorage.getItem("activeBudget");
    console.log(activeBudget);
    if (activeBudget == null) {
      toast({
        title: "No active budget",
        description: "Set an active budget to track",
        isClosable: true,
        duration: 5000,
        status: "warning",
      });
    }
  }, []);
  let [income, setIncome] = useState(0);
  let [expense, setExpense] = useState(0);
  let [groupBy, setGroupBy] = useState("Date");
  let [selectedMonth, setSelectedMonth] = useState(getMonth(today));
  const transactions = useLiveQuery(async () => {
    let [year, month] = selectedMonth.split("-");
    let transactions = await getTransactionsByMonthYear(month, year);

    setIncome(getTotalIncome(transactions));
    setExpense(getTotalExpense(transactions));
    return transactions;
  }, [selectedMonth]);

  console.log(transactions);

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="2rem">
        <Heading>Transactions</Heading>
        <Box>
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </Box>
      </Flex>
      {transactions && (
        <StatsView expense={expense} income={income} isBudget={false} />
      )}

      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <CreateTransaction />
        </Box>
        <Box>
          <Menu>
            <MenuButton as={Button}>{groupBy}</MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setGroupBy("Date");
                }}
              >
                Date
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setGroupBy("Category");
                }}
              >
                Category
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      {transactions && (
        <TransactionList
          transactions={transactions}
          groupByValue={groupBy.toLowerCase()}
        />
      )}
    </Box>
  );
}
