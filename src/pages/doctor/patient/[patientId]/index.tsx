import Navbar from "@/components/Navbar";
import { getSessions, postSession } from "@/controllers/sessions";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Skeleton,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function PatientSessions() {
  const router = useRouter();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const sessionsQuery = useQuery({
    queryKey: ["session", router.query.patientId],
    queryFn: () => getSessions(router.query.patientId as string),
    enabled: !!router.query.patientId,
  });
  const postSessionMutation = useMutation({
    mutationFn: () => postSession(title, +(router.query.patientId as string)),
    onSuccess: (data) => {
      toast({
        status: "success",
        title: "Session Created",
        description: "Redirecting to sessions page",
      });
      queryClient.invalidateQueries(["session", router.query.patientId]);
      router.push(`/doctor/session/${data.session_id}`);
    },
    onError: () => {
      toast({
        status: "error",
        title: "Something went wrong",
      });
    },
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
          <Button
            isLoading={postSessionMutation.isLoading}
            disabled={!title}
            rounded="full"
            onClick={() => {
              postSessionMutation.mutate();
            }}
          >
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
                  Started at: {moment(session.startDate).format("DD/MM/YY")}
                </Text>
              </Flex>
            </Box>
            <Link href={`/doctor/session/${session.id}`}>
              <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
            </Link>
          </Flex>
        ))}
        {/* //` Empty state */}
        {!sessionsQuery.isLoading &&
          sessionsQuery.data &&
          sessionsQuery.data.length == 0 && (
            <Box>
              <Center my={10}>
                <Heading size="md">No sessions exist with this user</Heading>
              </Center>
            </Box>
          )}
      </Box>
    </main>
  );
}
