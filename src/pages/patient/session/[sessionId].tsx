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
    Divider,
    Collapse
} from '@chakra-ui/react'
import Dosage from '@/components/Dosage';
import { useState } from 'react';

const sessions = [
    {
        id: 0,
        date: "20/06/23",
        symptoms: ["Headache", "Fatigue", "Nausea", "Stomachache"]
    },
    {
        id: 1,
        date: "10/06/23",
        symptoms: ["Breathing Problems", "Fever"]
    },
    {
        id: 2,
        date: "26/05/23",
        symptoms: ["Indigestion", "Vomiting", "Nausea", "Gas"]
    },
    {
        id: 3,
        date: "13/04/23",
        symptoms: ["Cough", "Fatigue", "Swelling"]
    },
]

const presciptions = [
    {
        id: 0,
        medName: "Paracetamol",
        days: 5,
        dosage: {
            morning: 1,
            afternoon: -1,
            evening: 1
        }
    },
    {
        id: 1,
        medName: "Ibuprofen",
        days: 3,
        dosage: {
            morning: 1,
            afternoon: 0,
            evening: 1
        }
    },
    {
        id: 2,
        medName: "Amlodipine",
        days: 6,
        dosage: {
            morning: 1,
            afternoon: 0,
            evening: 1
        }
    },
]


export default function SessionPage() {
    // const [expandedPanels, setExpandedPanels] = useState([]);
    // const togglePanel = (panelIndex) => {
    //     if (expandedPanels.includes(panelIndex)) {
    //         setExpandedPanels(expandedPanels.filter((index) => index !== panelIndex));
    //     } else {
    //         setExpandedPanels([...expandedPanels, panelIndex]);
    //     }
    // };

    return (
        <div>
            <Navbar />
            <Box maxW="6xl" mx="auto">
                {/* //` STATS */}
                <Box h="56" my={4} rounded="md" bg="gray.200" display="flex" justifyContent="center" alignItems="center">
                    <Heading>Dr Anil Shah</Heading>
                </Box>
                <Flex
                    mx="auto"
                    maxW="5xl"
                    my={16}
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
                            <Accordion allowMultiple>
                                {sessions.map((val, index) => {
                                    return (
                                        <>
                                            <AccordionItem border="none" key={index}>
                                                <h2>
                                                    <AccordionButton
                                                        // onClick={() => togglePanel(index)}
                                                    >
                                                        <Box as="span" flex='1' textAlign='left'>
                                                            {/* <Flex alignItems="center"> */}
                                                            <Heading fontWeight={"medium"} size="md" mt={4}>
                                                                <Text>Date: {val.date}</Text>
                                                            </Heading>
                                                            <Heading fontWeight={"medium"} size="md" my={4} >
                                                                <Text>Symptoms:
                                                                    {val.symptoms.map((sym, ind) => {
                                                                        return (
                                                                            <>
                                                                                <Tag key={ind} size='md' mb={3} variant='solid' mx={2} colorScheme='teal'>{sym}</Tag>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </Text>
                                                            </Heading>
                                                            {/* </Flex> */}

                                                        </Box>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                {/* <Collapse in={expandedPanels.includes(index)}></Collapse> */}
                                                <AccordionPanel pb={4} >
                                                    <Heading fontWeight={"medium"} size="md" mb="2">Prescription: </Heading>
                                                    <Box rounded="md" border={"2px"} borderColor={"gray.100"}>
                                                        <Flex
                                                            borderBottom={"1px"}
                                                            borderColor={"blackAlpha.200"}
                                                            p={4}
                                                            px={4}
                                                            color={""}
                                                            fontSize={"sm"}
                                                        >
                                                            <Heading size="sm" w="40%" >
                                                                Medicine
                                                            </Heading>
                                                            <Heading w="30%" size="sm">
                                                                <Center>Days</Center>
                                                            </Heading>
                                                            <Heading textAlign="center" w="30%" size="sm">
                                                                Dosage
                                                            </Heading>
                                                        </Flex>

                                                        {presciptions.map((presciption, i) => {
                                                            return (
                                                                <Flex
                                                                    color="blackAlpha.600"
                                                                    alignItems="center"
                                                                    borderBottom={"1px"}
                                                                    borderColor={"blackAlpha.200"}
                                                                    fontWeight={"bold"}
                                                                    key={i}
                                                                    p={3}
                                                                    px={4}
                                                                    fontSize={"sm"}
                                                                >
                                                                    <Box
                                                                        w="40%"
                                                                    // pr={4}
                                                                    // flex={1}
                                                                    >
                                                                        {presciption.medName}
                                                                    </Box>
                                                                    <Box w="30%">
                                                                        <Center>{presciption.days}</Center>
                                                                    </Box>
                                                                    <Box w="30%">
                                                                        <Center>
                                                                            <Dosage
                                                                                dosage={presciption.dosage}
                                                                            />
                                                                        </Center>
                                                                    </Box>
                                                                </Flex>
                                                            )
                                                        }
                                                        )}
                                                    </Box>
                                                </AccordionPanel>
                                            </AccordionItem>
                                            <Divider />
                                        </>
                                    )
                                })}
                            </Accordion>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </div>
    )
}