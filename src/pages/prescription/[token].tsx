import { Box, Flex, Heading, Center, Skeleton, Spacer } from "@chakra-ui/react";
import Dosage from "@/components/Dosage";
import { useQuery } from "@tanstack/react-query";
import { getPrescriptionScan } from "@/controllers/visits";
import { useRouter } from "next/router";
import moment from "moment";


export default function Scanned() {
  const router = useRouter();
  const detailsQuery = useQuery({
    queryFn: () => getPrescriptionScan(router.query.token as string),
    queryKey: ["prescription-details", router.query.token],
    enabled: !!router.query.token,
  });
  return (
    <div>
      {detailsQuery.isLoading && (
        <>
          <Skeleton mx="auto" h="120px" w="75vw" mt="60px" />
          <Box w="75vw" m="auto" mt={10}>
            <Skeleton h="40px" w="300px" mb={5} />
            <Flex gap={6} justifyContent="space-between">
              <Skeleton h="40px" flex="1" />
              <Skeleton h="40px" w="100px" />
              <Skeleton h="40px" flex="1" />
            </Flex>
            {[1, 2, 3, 4].map((n) => (
              <Flex my={5} key={n} gap={6} justifyContent="space-between">
                <Box flex={1}>
                  <Skeleton h="15px" w="300px" />
                </Box>
                <Skeleton h="15px" w="100px" />
                <Flex flex={1}>
                  <Spacer />
                  <Skeleton h="15px" w="300px" />
                </Flex>
              </Flex>
            ))}
          </Box>
        </>
      )}
      {detailsQuery.data && (
        <>
          <Box
            mx="auto"
            bg="gray.200"
            h="120px"
            w="75vw"
            borderRadius="10px"
            mt="60px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              width="70vw"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <strong>Dr. Name:</strong> {detailsQuery.data.doctorName}
              </Box>
              <Box>
                <strong>Date:</strong>{" "}
                {moment(detailsQuery.data.date).format("L")}
              </Box>
            </Box>
            <Box
              width="70vw"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={5}
            >
              <Box>
                <strong>Patient Name:</strong> {detailsQuery.data.doctorName}
              </Box>
              <Box width="13%">
                <strong>Age:</strong> {detailsQuery.data.patientAge ?? "-"}
              </Box>
            </Box>
          </Box>

          <Box w="75vw" m="auto" mt={10}>
            <Heading fontWeight={"medium"} size="md" mb={5}>
              Prescription
            </Heading>
            <Box rounded="md" border={"2px"} borderColor={"gray.100"}>
              <Flex
                borderBottom={"1px"}
                borderColor={"blackAlpha.200"}
                p={4}
                px={4}
                color={""}
                fontSize={"sm"}
              >
                <Heading size="sm" w="33%">
                  Medicine
                </Heading>
                <Heading w="33%" size="sm">
                  <Center>Days</Center>
                </Heading>
                <Heading textAlign="center" w="33%" size="sm">
                  Dosage
                </Heading>
              </Flex>

              {detailsQuery.data.prescriptions.map((presciption, i) => {
                return (
                  <Flex
                    color="blackAlpha.600"
                    alignItems="center"
                    borderBottom={"1px"}
                    borderColor={"blackAlpha.200"}
                    fontWeight={"bold"}
                    key={i}
                    p={3}
                    px={4}
                    fontSize={"sm"}
                  >
                    <Box w="33%">{presciption.medicine.name}</Box>
                    <Box w="33%">
                      <Center>{presciption.days}</Center>
                    </Box>
                    <Box w="33%">
                      <Center>
                        <Dosage dosage={presciption.dosage} />
                      </Center>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}
