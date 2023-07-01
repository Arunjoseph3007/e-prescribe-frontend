import { Heading, Flex, Box, Text, Link } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Navbar from "@/components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { getSessionForPatient } from "@/controllers/sessions";
import { useRouter } from "next/router";
import moment from "moment";

export default function DoctorPage() {
  const router = useRouter();
  const sessionsQuery = useQuery({
    queryFn: () => getSessionForPatient(+(router.query.doctorId as string)),
    queryKey: ["sessions", router.query.doctorId],
  });

  return (
    <div>
      <Navbar />
      {sessionsQuery.data &&
        sessionsQuery.data.map((session) => (
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
                Last visit {moment(session.lastVisit).format("L")}
              </Text>
              <Flex fontWeight="medium" gap={2}>
                <Text fontSize="sm">No Of Visits: {session.noOfVisits}</Text>
                <Text fontSize="sm">
                  Started: {moment(session.startDate).fromNow()}
                </Text>
              </Flex>
            </Box>
            <Link href={`/patient/session/${session.id}`}>
              <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
            </Link>
          </Flex>
        ))}
    </div>
  );
}
