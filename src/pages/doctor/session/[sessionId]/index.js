import Navbar from "@/components/Navbar";
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
  Center,
  Divider,
  Collapse,
  Circle,
} from "@chakra-ui/react";
import Dosage from "@/components/Dosage";
import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getVisits } from "@/controllers/visits";
import moment from "moment";
import { AddIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Header from "../../../../components/Header";

export default function Prescribe() {
  const router = useRouter();
  const visitsQuery = useQuery({
    queryFn: () => getVisits(router.query.sessionId),
    queryKey: ["vists"],
    enabled: !!router.query.sessionId,
  });
  const [expandedPanels, setExpandedPanels] = useState([]);
  const togglePanel = (panelIndex) => {
    if (expandedPanels.includes(panelIndex)) {
      setExpandedPanels(expandedPanels.filter((index) => index !== panelIndex));
    } else {
      setExpandedPanels([...expandedPanels, panelIndex]);
    }
  };

  return (
    <main>
      <Navbar />
      <Box maxW="6xl" minH="100vh" mx="auto">
        {/* //` STATS */}
        <Header/>
        <Box w="5xl" m="auto">
          <Link href={router.asPath + "/new-visit"}>
            <Button
              my={3}
              w="full"
              leftIcon={<AddIcon />}
            >
              Add New Visit
            </Button>
          </Link>
        </Box>

        {visitsQuery.data && visitsQuery.data.length > 0 && (
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
                <Accordion allowMultiple>
                  {visitsQuery.data.map((val, index) => {
                    return (
                      <Fragment key={index}>
                        <AccordionItem border="none" >
                          <h2>
                            <AccordionButton onClick={() => togglePanel(index)}>
                              <Box as="span" flex="1" textAlign="left">
                                <Heading fontWeight={"medium"} size="md" mt={4}>
                                  <Text>
                                    Date: {moment(val.date).format("L")}
                                  </Text>
                                </Heading>
                                <Heading fontWeight={"medium"} size="md" my={4}>
                                  <Text>
                                    Symptoms:
                                    {val.symptoms.filter(Boolean).map((sym, ind) => (
                                      <Tag
                                        key={ind*100+1}
                                        size="md"
                                        mb={3}
                                        variant="solid"
                                        mx={2}
                                        colorScheme="teal"
                                      >
                                        {sym}
                                      </Tag>
                                    ))}
                                  </Text>
                                </Heading>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h2>
                          <Collapse
                            in={expandedPanels.includes(index)}
                          ></Collapse>
                          <AccordionPanel pb={4}>
                            <Heading fontWeight={"medium"} size="md" mb="2">
                              Prescription:{" "}
                            </Heading>
                            <Box
                              rounded="md"
                              border={"2px"}
                              borderColor={"gray.100"}
                            >
                              <Flex
                                borderBottom={"1px"}
                                borderColor={"blackAlpha.200"}
                                p={4}
                                px={4}
                                color={""}
                                fontSize={"sm"}
                              >
                                <Heading size="sm" w="40%">
                                  Medicine
                                </Heading>
                                <Heading w="30%" size="sm">
                                  <Center>Days</Center>
                                </Heading>
                                <Heading textAlign="center" w="30%" size="sm">
                                  Dosage
                                </Heading>
                              </Flex>

                              {val.prescriptions.map((presciption, i) => {
                                return (
                                  <Flex
                                    color="blackAlpha.600"
                                    alignItems="center"
                                    borderBottom={"1px"}
                                    borderColor={"blackAlpha.200"}
                                    fontWeight={"bold"}
                                    key={10*i+10}
                                    p={3}
                                    px={4}
                                    fontSize={"sm"}
                                  >
                                    <Box w="40%">
                                      {presciption.medicine.name}
                                    </Box>
                                    <Box w="30%">
                                      <Center>{presciption.days}</Center>
                                    </Box>
                                    <Box w="30%">
                                      <Center>
                                        <Dosage dosage={presciption.dosage} />
                                      </Center>
                                    </Box>
                                  </Flex>
                                );
                              })}
                            </Box>
                          </AccordionPanel>
                        </AccordionItem>
                        <Divider />
                      </Fragment>
                    );
                  })}
                </Accordion>
              </Box>
            </Box>
          </Flex>
        )}

        {visitsQuery.isFetched && visitsQuery.data.length == 0 && (
          <Center
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
            <Heading textAlign="center" size="md">
              No sessions exist with this user
            </Heading>
          </Center>
        )}
      </Box>
    </main >
  );
}
