import { ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";
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
import { useAuth } from "@/context/AuthContext";
import { FaUserNurse } from "react-icons/fa";
import { RiTempColdFill } from "react-icons/ri";
import { MdOutlineVisibility } from "react-icons/md";

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
        mx="auto"
        p={6}
        shadow="md"
        border="1px"
        borderColor="blackAlpha.100"
        w="95vw"
        maxW="5xl"
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
            <Icon mb={-1} fontSize="md" mr={2} as={MdOutlineVisibility} />
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
        <Link href="/patient/search">
          <Button px={12} leftIcon={<SearchIcon />} ml={8} rounded="full">
            Search Doctor
          </Button>
        </Link>
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
                    maxW="5xl"
                    my={8}
                    px="30px"
                    py="45px"
                    rounded="md"
                    h="24"
                    alignItems={"center"}
                    shadow="md"
                    borderWidth={1}
                    borderColor="gray.100"
                    key={session.id}
                  >
                    <Box flex={1}>
                      <Box>
                        <strong>Title: </strong>
                        {session.title}
                      </Box>
                      <Box
                        width="45vw"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt={3}
                      >
                        <Box width="30%">
                          <Text fontSize={"sm"} color="GrayText">
                            Last visit {moment(session.lastVisit).fromNow()}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm">
                            No of Visits: {session.noOfVisits}
                          </Text>
                        </Box>
                        <Box width="30%">
                          <Text fontSize="sm">
                            Started at:{" "}
                            {moment(session.startDate).format("DD/MM/YY")}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      bgColor="var(--chakra-colors-green-500)"
                      borderRadius="50%"
                    >
                      <Link href={`patient/session/${session.id}`}>
                        <ChevronRightIcon fontSize={"4xl"} color={"white"} />
                      </Link>
                    </Box>
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
