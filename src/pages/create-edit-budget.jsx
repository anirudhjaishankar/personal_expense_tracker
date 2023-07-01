import {
  Heading,
  Flex,
  Button,
  Icon,
  Box,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CreateBudgetItem } from "../components/CreateBudgetItem";
import { useState } from "react";

export function CreateEditBudget() {
  let [budgetName, setBudgetName] = useState("New Budget");
  const navigate = useNavigate();
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
        <CreateBudgetItem />
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
          Expense Items
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
          Income Items
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
          Current Budget
        </Box>
      </Flex>
      <Flex justifyContent="end">
        <Button leftIcon={<FiCheck />}>Confirm</Button>
      </Flex>
    </Box>
  );
}
