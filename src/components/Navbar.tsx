import { useAuth } from "@/context/AuthContext";
import { Box, Flex, Button, Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Navbar() {
  const { status, user, logout } = useAuth();

  return (
    <Box>
      <Flex
        justify="space-between"
        alignItems="center"
        mx="auto"
        maxW="6xl"
        w="95vw"
        mt={3}
      >
        <Image src="/images/landscapeLogo.PNG" alt="Loading..." w="230px" />
        {status == "unauthenticated" ? (
          <Flex gap={3}>
            <Button as={Link} href="/login" rounded="full">
              login
            </Button>
            <Button as={Link} href="/register" rounded="full" variant="outline">
              Signup
            </Button>
          </Flex>
        ) : (
          <Flex gap={3}>
            <Button
              as={Link}
              href={user?.isDoctor ? "/doctor" : "/patient"}
              variant="ghost"
              rounded="full"
            >
              {user?.fullName}
            </Button>
            <Button onClick={() => logout()} rounded="full" variant="outline">
              Logout
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
