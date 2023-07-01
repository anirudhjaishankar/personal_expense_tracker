import {
  Box,
  Flex,
  Heading,
  Input,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Button,
  Card,
  Text,
} from "@chakra-ui/react";
import { Emoji } from "emoji-picker-react";
import { useState } from "react";
import { getMonth } from "../utils";
import { StatsView } from "../components/StatsView";
import { getBudgetByMonthYear, createBudget } from "../db/budgets";
import { useLiveQuery } from "dexie-react-hooks";
import { CreateBudgetItem } from "../components/CreateBudgetItem";

export function BudgetsPage() {
  const today = new Date();
  let [selectedMonth, setSelectedMonth] = useState(getMonth(today));
  const budget = useLiveQuery(async () => {
    let [year, month] = selectedMonth.split("-");
    let budgets = await getBudgetByMonthYear(month, year);
    return budgets;
  }, [selectedMonth]);

  function onCreateBudget() {
    let [year, month] = selectedMonth.split("-");
    createBudget({
      month,
      year,
      budgetItems: [],
      income: 0,
      expense: 0,
    }).then(() => {
      console.log("budget created");
    });
  }

  console.log(budget);

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb="2rem">
        <Heading>Budgets</Heading>
        <Box>
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </Box>
      </Flex>
      <StatsView income={115000} expense={115000} isBudget={true} />
      <Flex mb={4}>
        <CreateBudgetItem budget={budget} />
      </Flex>
      {budget?.length !== 0 ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Type</Th>
                <Th isNumeric>Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Flex alignItems="center">
                    <Emoji unified="1f34a" /> Food
                  </Flex>
                </Td>
                <Td>Expense</Td>
                <Td isNumeric>{5000}</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Card>
          <Box textAlign="center" py={4} bgColor="gray.700" borderRadius="md">
            <Text>No Budget found</Text>
          </Box>
        </Card>
      )}
    </Box>
  );
}
