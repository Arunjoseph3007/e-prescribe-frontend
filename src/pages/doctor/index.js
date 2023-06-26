import { AddIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import PatientBox from "@/components/PatientBox";
import doctorPatientList from "@/controllers/doctorPatientList";
import { useState } from "react";
import { PatientController } from "@/controllers/patients";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Doctor() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  return (
    <div>
      <Navbar />
      <Box
        maxW="6xl"
        mx="auto"
        // bg="rgb(220, 224, 220)"
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
        {/* <Box h="56" my={4} rounded="md" bg="gray.200"><Heading textAlign="center">Dr. Anil Shah</Heading></Box> */}
        <Heading textAlign="center">Dr. Anil Shah</Heading>
      </Box>

      <Flex
        w="75vw"
        m="auto"
        mt="40px"
        mb="40px"
        justifyContent="center"
        alignItems="center"
      >
        <InputGroup size="md" w="60vw">
          <Input
            rounded="full"
            pr="4.5rem"
            placeholder="Enter Patient's name to search"
          />
          <InputRightElement width="5.5rem">
            <Button h="1.75rem" size="sm" bg="gray.250" rounded="full">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button onClick={onOpen} width="4.5vw" ml={8} rounded="full">
          <AddIcon />
        </Button>
      </Flex>

      {doctorPatientList.map((val, id) => {
        return <PatientBox username={val.username} key={id} name={val.name} age={val.age} />;
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
                  <Link href={`/doctor/patient/${result.userName}`}>
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
    </div>
  );
}
