import Navbar from '@/components/Navbar'
import {
    Box,
    Flex,
    Tag,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    Heading,
    Link,
    Center,
    Divider, Table, Tbody, Tr, Td
} from '@chakra-ui/react'
import Dosage from '@/components/Dosage';

const presciptions = [
    {
        id: 0,
        medName: "Paracetamol",
        days: 5,
        dosage: {
            morning:1,
            afternoon:-1,
            evening:1
        }
    },
    {
        id: 1,
        medName: "Ibuprofen",
        days: 3,
        dosage: {
            morning:1,
            afternoon:0,
            evening:1
        }
    },
    {
        id: 3,
        medName: "Amlodipine",
        days: 6,
        dosage: {
            morning:1,
            afternoon:0,
            evening:1
        }
    },
]

export default function prescribe() {
    return (
        <main>
            <Navbar />
            <Box maxW="6xl" mx="auto">
                {/* //` STATS */}
                <Box h="56" my={4} rounded="md" bg="gray.200"></Box>

                {/* <Box flex={1} flexDirection="row" my="5vh" mx="5vw">
                    <Text>Date: 20/06/23</Text>
                    <Text>Symptoms:
                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Headache</Tag>
                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Stomachache</Tag>
                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Fatigue</Tag>
                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Nausea</Tag>
                    </Text>
                    <Box>
                        Prescription:
                        <Accordion allowToggle>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box as="span" flex='1' textAlign='left'>
                                            <Flex alignItems="center">
                                                <Text>Amlodipine</Text>
                                                <Button>5</Button>

                                            </Flex>

                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    commodo consequat.
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                </Box> */}

                <Flex
                    mx="auto"
                    maxW="5xl"
                    my={4}
                    p={3}
                    rounded="md"
                    minH="200px"
                    alignItems={"center"}
                    shadow="md"
                    borderWidth={1}
                    borderColor="gray.100"
                >
                    <Box flex={1}>
                        <Box>
                            <Accordion allowToggle allowMultiple>
                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                {/* <Flex alignItems="center"> */}
                                                <Heading fontWeight={"medium"} size="md" mt={4}>
                                                    <Text>Date: 20/06/23</Text>
                                                </Heading>
                                                <Heading fontWeight={"medium"} size="md" my={4} >
                                                    <Text>Symptoms:
                                                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Headache</Tag>
                                                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Stomachache</Tag>
                                                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Fatigue</Tag>
                                                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Nausea</Tag>
                                                    </Text>
                                                </Heading>
                                                {/* </Flex> */}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} >
                                        <Heading fontWeight={"medium"} size="md" mt={4}>Prescription: </Heading>
                                        {/* <Box display="flex" alignItems="center">
                                            <Text pr="50px">Paracetamol</Text>
                                            <Box>5</Box>
                                            <Text pl="50px">1-0-1</Text>
                                        </Box> */}
                                        <Table variant="simple">
                                            <Tbody>
                                                <Tr>
                                                    <Td>Paracetamol</Td>
                                                    <Td>2</Td>
                                                    <Td>1-1-1</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Ibuprofen</Td>
                                                    <Td>5</Td>
                                                    <Td>1-0-1</Td>
                                                </Tr>
                                                <Tr>
                                                    <Td>Amoxicillin</Td>
                                                    <Td>4</Td>
                                                    <Td>0-0-1</Td>
                                                </Tr>
                                                {/* Add more rows as needed */}
                                            </Tbody>
                                        </Table>
                                    </AccordionPanel>
                                </AccordionItem>

                                <Divider />

                                <AccordionItem border="none">
                                    <h2>
                                        <AccordionButton>
                                            <Box as="span" flex='1' textAlign='left'>
                                                {/* <Flex alignItems="center"> */}
                                                <Heading fontWeight={"medium"} size="md" mt={4}>
                                                    <Text>Date: 10/05/23</Text>
                                                </Heading>
                                                <Heading fontWeight={"medium"} size="md" my={4} >
                                                    <Text>Symptoms:
                                                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Headache</Tag>
                                                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Stomachache</Tag>
                                                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Fatigue</Tag>
                                                        <Tag size='md' variant='solid' mx={2} colorScheme='teal'>Nausea</Tag>
                                                    </Text>
                                                </Heading>
                                                {/* </Flex> */}

                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} >
                                        <Heading fontWeight={"medium"} size="md" mb="2">Prescription: </Heading>
                                        <Box rounded="md" border={"2px"} borderColor={"gray.100"}>
                                            <Flex
                                                borderBottom={"1px"}
                                                borderColor={"blackAlpha.200"}
                                                p={3}
                                                px={4}
                                                color={""}
                                                fontSize={"sm"}
                                            >
                                                <Heading size="sm" flex={1}>
                                                    Medicine
                                                </Heading>
                                                <Heading w={28} size="sm">
                                                    <Center>Days</Center>
                                                </Heading>
                                                <Heading textAlign="center" w={200} size="sm">
                                                    Dosage
                                                </Heading>
                                            </Flex>

                                            {presciptions.map((presciption, i) => (
                                                <Flex
                                                    color="blackAlpha.600"
                                                    alignItems="center"
                                                    borderBottom={"1px"}
                                                    borderColor={"blackAlpha.200"}
                                                    fontWeight={"bold"}
                                                    key={i}
                                                    p={1}
                                                    px={4}
                                                    fontSize={"sm"}
                                                >
                                                    <Box
                                                        pr={4}
                                                        flex={1}
                                                    >
                                                        {presciption.medName}
                                                    </Box>
                                                    <Box w={28}>
                                                        <Center>{presciption.days}</Center>
                                                    </Box>
                                                    <Box w={200}>
                                                        <Center>
                                                            <Dosage
                                                                dosage={presciption.dosage}
                                                                // onMorning={(no) =>
                                                                //     setPrescriptions((p) => {
                                                                //         p[i].dosage.morning = no;
                                                                //     })
                                                                // }
                                                                // onAfternoon={(no) =>
                                                                //     setPrescriptions((p) => {
                                                                //         p[i].dosage.afternoon = no;
                                                                //     })
                                                                // }
                                                                // onEvening={(no) =>
                                                                //     setPrescriptions((p) => {
                                                                //         p[i].dosage.evening = no;
                                                                //     })
                                                                // }
                                                            />
                                                        </Center>
                                                    </Box>
                                                </Flex>
                                            ))}
                                        </Box>
                                    </AccordionPanel>
                                </AccordionItem>

                            </Accordion>
                        </Box>

                    </Box>
                </Flex>
            </Box>
        </main>
    )
}
