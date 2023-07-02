import { AddIcon, ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Accordion,
  Icon,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DoctorController from "@/controllers/doctor";
import Link from "next/link";
import { getRecentSessions } from "@/controllers/sessions";
import moment from "moment";
import { getRecentVisits } from "@/controllers/visits";
import PrescriptionAccordian from "@/components/PrescriptionAccordian";
import DoctorCard from "@/components/DoctorCard";
import Head from "next/head";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const { user } = useAuth();
  const doctorsQuery = useQuery({
    queryFn: DoctorController.getDoctorList,
    queryKey: ["recent-doctors"],
  });
  const recentSessionsQuery = useQuery({
    queryFn: getRecentSessions,
    queryKey: ["recent-sessions"],
  });
  const recentVisitsQuery = useQuery({
    queryFn: getRecentVisits,
    queryKey: ["recent-visits"],
  });

  return (  
    <div>
      <Head>
        <title>Patient</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Navbar />
      <Box
        maxW="6xl"
        mx="auto"
        p={6}
        shadow="md"
        border="1px"
        borderColor="blackAlpha.100"
        w="75vw"
        display="flex"
        justifyContent="space-between"
        py="10"
        m="auto"
        borderRadius="10px"
        mt="40px"
      >
        <Box flex={1}>
          <Heading>{user?.fullName}</Heading>
          <Text color="blackAlpha.400">Age {user?.age}</Text>
        </Box>

        <Stat>
          <StatLabel>Doctors</StatLabel>
          <StatNumber>{doctorsQuery.data?.length}</StatNumber>
          <StatHelpText>
            <Icon mr={2} as={FaUserNurse} />
            Consulted
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Sessions</StatLabel>
          <StatNumber>{recentSessionsQuery.data?.length}</StatNumber>
          <StatHelpText>
            <Icon mr={2} as={RiTempColdFill} />
            Completed
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Visits</StatLabel>
          <StatNumber>{recentVisitsQuery.data?.length}</StatNumber>
          <StatHelpText>
            <Icon mb={-1} fontSize='md' mr={2} as={MdOutlineVisibility} />
            Visited
          </StatHelpText>
        </Stat>
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rounded="full"
            pr="4.5rem"
            placeholder="Enter Doctor's name to search"
          />
          <InputRightElement width="5.5rem">
            <Button h="1.75rem" size="sm" bg="gray.250" rounded="full">
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button width="4.5vw" ml={8} rounded="full">
          <SearchIcon />
        </Button>
      </Flex>

      <Box mx="auto" maxW="5xl">
        <Tabs>
          <TabList>
            <Tab>Doctors</Tab>
            <Tab>Recent Sessions</Tab>
            <Tab>Recent Visits</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {doctorsQuery.data &&
                doctorsQuery.data.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </TabPanel>
            <TabPanel>
              {recentSessionsQuery.data &&
                recentSessionsQuery.data.map((session) => (
                  <Flex
                    mx="auto"
                    maxW="4xl"
                    my={4}
                    p={3}
                    rounded="md"
                    h="24"
                    alignItems={"center"}
                    shadow="md"
                    borderWidth={1}
                    borderColor="gray.100"
                    key={session.id}
                  >
                    <Box flex={1}>
                      <Heading fontWeight={"medium"} size="md">
                        {session.title}
                      </Heading>
                      <Text fontSize={"sm"} color="GrayText">
                        Last visit {moment(session.lastVisit).fromNow()}
                      </Text>
                      <Flex fontWeight="medium" gap={2}>
                        <Text fontSize="sm">
                          No Of Visits: {session.noOfVisits}
                        </Text>
                        <Text fontSize="sm">
                          Starter at:{" "}
                          {moment(session.startDate).format("DD/MM/YY")}
                        </Text>
                      </Flex>
                    </Box>
                    <Link href={`patient/session/${session.id}`}>
                      <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
                    </Link>
                  </Flex>
                ))}
            </TabPanel>
            <TabPanel>
              <Accordion allowMultiple>
                {recentVisitsQuery.data &&
                  recentVisitsQuery.data.map((visit) => (
                    <Box
                      my={3}
                      rounded="md"
                      border="2px"
                      borderColor="gray.100"
                      key={visit.id}
                    >
                      <PrescriptionAccordian val={visit} />
                    </Box>
                  ))}
              </Accordion>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}
