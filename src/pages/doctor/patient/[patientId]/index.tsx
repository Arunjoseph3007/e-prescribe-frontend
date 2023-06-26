import Navbar from "@/components/Navbar";
import { getSessions } from "@/controllers/sessions";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PatientSessions() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const sessionsQuery = useQuery({
    queryKey: ["session", router.query.patientId],
    queryFn: () => getSessions(router.query.patientId as string),
    enabled: !!router.query.patientId,
  });

  return (
    <main>
      <Head>
        <title>Session | {router.query.patientId}</title>
      </Head>
      <Navbar />
      <Box maxW="6xl" mx="auto">
        {/* //` STATS */}
        <Box h="56" my={4} rounded="md" bg="gray.200"></Box>

        {/* //` Add new session box */}
        <Flex gap={2} my={8} maxW="5xl" mx="auto" alignItems="center">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rounded="full"
            placeholder="Add a session"
            variant="filled"
          />
          <Button disabled={!title} rounded="full">
            Add Session
          </Button>
        </Flex>

        {/* Loading state */}
        {sessionsQuery.isLoading &&
          new Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton height="24" mx="auto" maxW="4xl" my={4} key={i} />
            ))}
        {/* //` Sessions list */}
        {sessionsQuery.data?.map((session) => (
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
                <Text fontSize="sm">No Of Visits: {session.noOfVisits}</Text>
                <Text fontSize="sm">
                  Starter at: {moment(session.startDate).format("DD/MM/YY")}
                </Text>
              </Flex>
            </Box>
            <Link href={`/session/${session.id}`}>
              <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
            </Link>
          </Flex>
        ))}
      </Box>
    </main>
  );
}
