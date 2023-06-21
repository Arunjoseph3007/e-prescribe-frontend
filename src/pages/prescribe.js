import Navbar from '../components/Navbar'
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
    Divider
} from '@chakra-ui/react'

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
                    maxW="4xl"
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
                            <Accordion allowToggle>
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
                                        <Box display="flex" alignItems="center">
                                            <Text pr="50px">Paracetamol</Text>
                                            <Box>5</Box>
                                            <Text pl="50px">1-0-1</Text>
                                        </Box>
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
                                        <Heading fontWeight={"medium"} size="md" mt={4}>Prescription: </Heading>
                                        <Box display="flex" alignItems="center">
                                            <Text pr="50px">Paracetamol</Text>
                                            <Box>5</Box>
                                            <Text pl="50px">1-0-1</Text>
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
