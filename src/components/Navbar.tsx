import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Heading,
  Image
} from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex justify="space-between" alignItems="center" mx="auto" maxW="6xl" mt={3}>
        <Image src="/images/landscapeLogo.PNG" alt='Loading...' w="230px"/>
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
