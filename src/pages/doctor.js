import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";

import {
    Box,
    Flex,
    Heading,
    Link,
    InputGroup,
    Input,
    InputRightElement,
    Button
} from "@chakra-ui/react";

import Navbar from '@/components/Navbar';
import PatientBox from "../components/PatientBox";
import doctorPatientList from "../controllers/doctorPatientList";

export default function doctor() {
    return (
        <div>
            <Navbar />
            <Box
                maxW="6xl" mx="auto"
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

            <Flex w="75vw" m="auto" mt="40px" mb="40px" justifyContent="center" alignItems="center">
                <InputGroup size="md" w="60vw">
                    <Input
                        rounded="full"
                        pr='4.5rem'
                        placeholder="Enter Patient&apos;s name to search"
                    />
                    <InputRightElement width='5.5rem'>
                        <Button h='1.75rem' size='sm' bg='gray.250' rounded="full">
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>

                <Button width="4.5vw" ml={8} rounded="full" ><AddIcon /></Button>
            </Flex>

            {doctorPatientList.map((val, id) => {
                return (
                    <PatientBox
                        key={id}
                        name={val.name}
                        age={val.age}
                    />
                )
            })}

        </div>
    )
}
