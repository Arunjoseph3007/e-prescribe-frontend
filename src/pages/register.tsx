import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function Register() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    alert("Submitting");
  };

  return (
    <Box bgGradient="linear(to-br, green.200, white, white)">
      <Flex minH="100vh" maxW="6xl" mx="auto">
        <Box flex={1}>Image</Box>
        <Box>
          <Box
            onSubmit={handleSubmit}
            my={24}
            p={6}
            w={500}
            shadow="lg"
            rounded="md"
            as="form"
            bg="white"
          >
            <Heading textAlign="center" size="lg">
              Create an Account
            </Heading>
            <Box my={3} fontSize="sm" textAlign={"center"}>
              Already have an account?{" "}
              <Text display="inline" color="blue.400">
                <Link href="/login">Login</Link>
              </Text>
            </Box>
            <Flex gap={2}>
              <FormControl mt={4} my={2} isRequired>
                <FormLabel>First name</FormLabel>
                <InputGroup>
                  <Input
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    placeholder="John"
                  />
                </InputGroup>
              </FormControl>
              <FormControl my={2} isRequired>
                <FormLabel>Last name</FormLabel>
                <InputGroup>
                  <Input
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                  />
                </InputGroup>
              </FormControl>
            </Flex>
            <FormControl my={2} isRequired>
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <Input
                  name="userName"
                  value={formState.userName}
                  onChange={handleChange}
                  placeholder="eg. john_doe"
                />
              </InputGroup>
            </FormControl>
            <FormControl my={2} isRequired>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <EmailIcon />
                </InputLeftElement>
                <Input
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="john.doe@gmail.com"
                />
              </InputGroup>
            </FormControl>
            <FormControl my={2} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  type="password"
                />
              </InputGroup>
            </FormControl>
            <FormControl my={2} isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  type="password"
                />
              </InputGroup>
            </FormControl>
            <Button type="submit" my={2} w="full" colorScheme="green">
              Create Account
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
