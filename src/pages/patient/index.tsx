import {
  ChevronRightIcon,
  EmailIcon,
  PhoneIcon,
  SearchIcon,
} from "@chakra-ui/icons";
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
  Avatar,
  HStack,
  Icon,
  AvatarBadge,
  Circle,
  Tooltip,
  Accordion,
} from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DoctorController from "@/controllers/doctor";
import { FaClock, FaMap } from "react-icons/fa";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { getRecentSessions } from "@/controllers/sessions";
import moment from "moment";
import { getRecentVisits } from "@/controllers/visits";
import PrescriptionAccordian from "@/components/PrescriptionAccordian";
import DoctorCard from "@/components/DoctorCard";
import Head from "next/head";

export default function HomePage() {
  const [query, setQuery] = useState("");
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
        <Heading textAlign="center">Anil Shah</Heading>
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
                      <Box><strong>Title:{" "}</strong>{session.title}</Box>
                      <Box width="45vw" display="flex" justifyContent="space-between" alignItems="center" mt={3}>
                        <Box width="30%">
                          <Text fontSize={"sm"} color="GrayText">
                            Last visit {moment(session.lastVisit).fromNow()}
                          </Text>
                        </Box>
                        <Box>
                          <Text fontSize="sm">No of Visits: {session.noOfVisits}</Text>
                        </Box>
                        <Box width="30%">
                          <Text fontSize="sm">
                            Started at: {moment(session.startDate).format("DD/MM/YY")}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                    <Box bgColor="var(--chakra-colors-green-500)" borderRadius="50%">
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
