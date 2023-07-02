import { useAuth } from "@/context/AuthContext";
import { EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Tooltip,
  Image,
  Center
} from "@chakra-ui/react";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";

export default function Register() {
  const { register, loading } = useAuth();
  const [isDoc, setisDoc] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 20,
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    register({ ...formState, isDoc });
  };

  return (
    <Box>
      <Flex minH="100vh" maxW="6xl" mx="auto">
        <Center flex={1}>
          <Image src="/images/main_logo.PNG" w="30vw"></Image>
        </Center>
        <Box>
          <Box
            onSubmit={handleSubmit}
            my={6}
            p={5}
            py={3}
            maxW={500}
            shadow="lg"
            rounded="md"
            as="form"
            bg="white"
          >
            <Heading textAlign="center" size="lg">
              Create an Account
            </Heading>

            <Flex gap={2}>
              <FormControl mt={4} my={1} isRequired>
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
              <FormControl my={1} isRequired>
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
            <FormControl my={1} isRequired>
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
            <Flex gap={2}>
              <FormControl w="full" my={1} isRequired>
                <FormLabel>Age</FormLabel>
                <InputGroup>
                  <Input
                    name="age"
                    type="number"
                    value={formState.age}
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl my={1} isRequired>
                <FormLabel>Role</FormLabel>
                <Flex gap={2}>
                  <Tooltip label="Doctor">
                    <Button
                      flex={1}
                      variant={isDoc ? "solid" : "outline"}
                      onClick={(e) => setisDoc(true)}
                    >
                      <Icon as={AiFillMedicineBox} />
                    </Button>
                  </Tooltip>
                  <Tooltip label="User">
                    <Button
                      flex={1}
                      variant={!isDoc ? "solid" : "outline"}
                      onClick={(e) => setisDoc(false)}
                    >
                      <Icon as={FaUserCircle} />
                    </Button>
                  </Tooltip>
                </Flex>
              </FormControl>
            </Flex>
            <FormControl my={1} isRequired>
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
            <FormControl my={1} isRequired>
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
            <FormControl my={1} isRequired>
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
            <Button isLoading={loading} type="submit" my={1} w="full">
              Create Account
            </Button>
            <Box my={2} fontSize="sm" textAlign={"center"}>
              Already have an account?{" "}
              <Text display="inline" color="blue.400">
                <Link href="/login">Login</Link>
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
