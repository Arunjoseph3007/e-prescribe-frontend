import {
  AddIcon,
  ChevronRightIcon,
  SearchIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import PatientBox from "@/components/PatientBox";
import { useState } from "react";
import { PatientController } from "@/controllers/patients";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Head from "next/head";

export default function Doctor() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const suggestModal = useDisclosure();
  const [query, setQuery] = useState("");
  const getPatientsQuery = useQuery({
    queryFn: PatientController.getPatients,
    queryKey: ["patients"],
  });
  const searchQuery = useQuery({
    queryFn: () => PatientController.searchPatient(query),
    queryKey: ["patient-search", query],
    enabled: !!(query && isOpen),
  });
  const [suggestMed, setSuggestMed] = useState("");

  return (
    <div>
      <Head>
        <title>Doctor</title>
      </Head>
      
      <Navbar />

      <Box
        maxW="6xl"
        mx="auto"
        bg="gray.200"
        h="120px"
        w="75vw"
        display="flex"
        justifyContent="center"
        alignItems="center"
        m="auto"
        borderRadius="10px"
        mt="40px"
      >
        <Heading textAlign="center">Dr. Anil Shah</Heading>
      </Box>

      <Flex
        maxW="5xl"
        m="auto"
        mt="40px"
        mb="40px"
        justifyContent="space-between"
        alignItems="center"
      >
        <InputGroup size="md" w="75vw">
          <Input
            rounded="full"
            pr="4.5rem"
            placeholder="Enter Patient's name to search"
          />
          <InputRightElement pr={4} cursor="pointer">
            <SearchIcon />
          </InputRightElement>
        </InputGroup>

        <Button onClick={onOpen} width="4.5vw" ml={8} rounded="full">
          <AddIcon />
        </Button>
      </Flex>

      {getPatientsQuery.data &&
        getPatientsQuery.data.map((val, id) => {
          return (
            <PatientBox
              username={val.userName}
              key={id}
              name={val.firstName + " " + val.lastName}
              age={val.age}
              id={val.id}
            />
          );
        })}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight={"bold"}>Add a patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody minH="30vh">
            <Input
              onChange={(e) => setQuery(e.target.value)}
              rounded="full"
              variant={"filled"}
              placeholder="Enter Patient's name to search"
            />
            {searchQuery.data &&
              searchQuery.data.map((result) => (
                <Flex
                  gap={2}
                  _hover={{ shadow: "md", bg: "gray.50" }}
                  shadow="sm"
                  p={3}
                  key={result.id}
                >
                  <Link href={`/doctor/patient/${result.id}`}>
                    <Box>
                      <Text fontSize="md" fontWeight="medium">
                        {result.firstName} {result.lastName}
                      </Text>
                      <Text color="GrayText" fontSize="sm">
                        {result.userName}
                      </Text>
                    </Box>
                  </Link>
                </Flex>
              ))}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box
        cursor="pointer"
        onClick={suggestModal.onOpen}
        position="fixed"
        bottom="4"
        right="6"
      >
        {/* <Box position="relative"> */}
        <Tooltip label="Suggest Medicine" placement="left">
          {/* <Box as={CalendarIcon} boxSize={8} color="green" /> */}
          <CalendarIcon />
        </Tooltip>
        {/* </Box> */}
      </Box>

      <Modal isOpen={suggestModal.isOpen} onClose={suggestModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Suggest a Medicine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => setSuggestMed(e.target.value)}
              rounded="full"
              variant={"filled"}
              placeholder="Enter name of Medicine"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={suggestModal.onClose}>
              Close
            </Button>
            <Button colorScheme="green">Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* <Box cursor="pointer" onClick={suggestModal.onOpen} position="fixed" right="5" bottom="5">
        <Tooltip label='Suggest Medicine' placement='left-start'>
          <Box color="green" as={FaMedkit} />
        </Tooltip>
      </Box>
      <Modal isOpen={suggestModal.isOpen} onClose={suggestModal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Suggest a Medicine</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => setSuggestMed(e.target.value)}
              rounded="full"
              variant={"filled"}
              placeholder="Enter name of Medicine"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost' mr={3} onClick={suggestModal.onClose}>
              Close
            </Button>
            <Button colorScheme='green' >Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </div>
  );
}
