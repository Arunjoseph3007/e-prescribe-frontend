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
  useToast,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import PatientBox from "@/components/PatientBox";
import { useState } from "react";
import { PatientController } from "@/controllers/patients";
import { MedicineController } from "@/controllers/medicine";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Head from "next/head";
import { useAuth } from "@/context/AuthContext";

export default function Doctor() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
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
  const suggestMedMutation = useMutation({
    mutationFn: MedicineController.suggestMedicine,
    onSuccess: (data) => {
      if (data.success) {
        toast({
          status: "success",
          title: "Medicine suggested",
          description: "We will verify and approve your medicine soon",
        });
        onClose();
      }
    },
  });
  const [suggestMed, setSuggestMed] = useState("");
  const [searchBox, setSearchBox] = useState("");
 
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
        <Heading textAlign="center">Dr. {user?.fullName}</Heading>
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
            onChange={(e) => {
              setSearchBox(e.target.value)
            }}
            value={searchBox}
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
        getPatientsQuery.data.filter((patient)=>{
          return patient.firstName.toLowerCase().includes(searchBox.toLowerCase())||patient.lastName.toLowerCase().includes(searchBox.toLowerCase())
        }).map((val, id) => {
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
        <Tooltip label="Suggest Medicine" placement="left">
          <CalendarIcon />
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
              value={suggestMed}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={suggestModal.onClose}>
              Close
            </Button>
            <Button
              onClick={() => suggestMedMutation.mutate(suggestMed)}
              colorScheme="green"
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
