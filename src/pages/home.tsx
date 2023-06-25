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

export default function HomePage() {
  const [query, setQuery] = useState("");
  const doctorsQuery = useQuery({
    queryFn: DoctorController.getDoctorList,
    queryKey: ["doctors"],
  });
  const recentSessionsQuery = useQuery({
    queryFn: getRecentSessions,
    queryKey: ["sessions"],
  });

  return (
    <div>
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
                  <Flex
                    p={3}
                    gap={6}
                    alignItems="center"
                    rounded="md"
                    shadow="sm"
                    border="1px"
                    borderColor="blackAlpha.100"
                    my={3}
                    key={doctor.id}
                  >
                    <Tooltip label={doctor.isAvailable && "Available"}>
                      <Avatar size="xl" bg="gray.300" icon={<AiOutlineUser />}>
                        {doctor.isAvailable && (
                          <AvatarBadge boxSize="0.8em" bg="green.500" />
                        )}
                      </Avatar>
                    </Tooltip>
                    <Box flex={1}>
                      <HStack>
                        <Text fontSize="2xl" fontWeight="bold">
                          {doctor.firstName} {doctor.lastName}
                        </Text>
                        <Circle size="5px" bg="blackAlpha.400" />
                        <Text fontSize="sm" color="blackAlpha.500">
                          {doctor.userName}
                        </Text>
                      </HStack>

                      <HStack mt={1} color="blackAlpha.600">
                        <EmailIcon />
                        <Text fontSize="sm">{doctor.email}</Text>
                      </HStack>

                      <HStack mt={2} gap={7}>
                        <HStack color="blackAlpha.600">
                          <PhoneIcon />
                          <Text fontSize="sm">{doctor.phone}</Text>
                        </HStack>

                        <HStack color="blackAlpha.600">
                          <Icon as={FaClock} />
                          <Text fontSize="sm">{doctor.workingHours}</Text>
                        </HStack>
                      </HStack>

                      <HStack mt={2} color="blackAlpha.600">
                        <Icon as={FaMap} />
                        <Text fontSize="sm">{doctor.address}</Text>
                      </HStack>
                    </Box>

                    <Link href="#">
                      <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
                    </Link>
                  </Flex>
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
                    <Link href={`/session/${session.id}`}>
                      <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
                    </Link>
                  </Flex>
                ))}
            </TabPanel>
            <TabPanel>Recent visits</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}
