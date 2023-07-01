import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Link,
  FormControl,
  FormLabel,
  InputGroup,
  Box,
  InputLeftElement,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formState.email, formState.password);
  };

  return (
    <div>
      <Flex h="100vh" justify="center" alignItems="center">
        <Box
          onSubmit={handleSubmit}
          my={24}
          p={6}
          w={375}
          shadow="lg"
          rounded="md"
          as="form"
          bg="white"
        >
          <Heading textAlign="center" size="lg">
            Login
          </Heading>

          <FormControl my={2} isRequired>
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
              <Input
                name="email"
                type="email"
                placeholder="john.doe@gmail.com"
                onChange={handleChange}
                value={formState.email}
              />
            </InputGroup>
          </FormControl>
          <FormControl my={2} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                type="password"
                placeholder="********"
                onChange={handleChange}
                value={formState.password}
              />
            </InputGroup>
          </FormControl>
          <Text my={6} color="grey">
            New to PrescribeMe?{" "} 
            <Link color="green" href="/register">
              Create an account
            </Link>
          </Text>
          <Button type="submit" my={2} w="full" colorScheme="green">
            Login
          </Button>
        </Box>
      </Flex>
    </div>
  );
}
