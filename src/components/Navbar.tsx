import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mx="auto" maxW="6xl">
        <Heading py={6} size="md">
          E-Prescribe
        </Heading>
        <Flex gap={3}>
          <Button as={Link} href="/login" rounded="full">
            login
          </Button>
          <Button as={Link} href="/register" rounded="full" variant="outline">
            Signup
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
