import Navbar from "@/components/Navbar";
import { Box, Flex, Accordion } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getVisits } from "@/controllers/visits";
import PrescriptionAccordian from "@/components/PrescriptionAccordian";

export default function SessionPage() {
  const router = useRouter();
  const visitsQuery = useQuery({
    queryFn: () => getVisits(router.query.sessionId as string),
    queryKey: ["vists"],
    enabled: !!router.query.sessionId,
  });

  return (
    <main>
      <Navbar />
      <Box maxW="6xl" mx="auto">
        {/* //` STATS */}
        <Box h="56" my={4} rounded="md" bg="gray.200"></Box>

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
                {visitsQuery.data &&
                  visitsQuery.data.map((val) => (
                    <PrescriptionAccordian key={val.id} val={val} />
                  ))}
              </Accordion>
            </Box>
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
