
import { Box, Flex, HStack, Text, Heading, Center } from '@chakra-ui/react';
import Dosage from '@/components/Dosage'


const presciptions = [
  {
    id: 0,
    medicine: "Paracetamol",
    days: 5,
    dosage: {
      morning: 1,
      afternoon: -1,
      evening: 1,
    },
  },
  {
    id: 1,
    medicine: "Ibuprofen",
    days: 3,
    dosage: {
      morning: 0,
      afternoon: 1,
      evening: 1,
    },
  },
  {
    id: 2,
    medicine: "Amlodipine",
    days: 6,
    dosage: {
      morning: 1,
      afternoon: 0,
      evening: 1,
    },
  },
];

export default function Scanned() {
  return (
    <div>
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
        <Box width="70vw" display="flex" justifyContent="space-between" alignItems="center">
          <Box><strong>Dr. Name:</strong> Dr. Anil Shah</Box>
          <Box width="13%"><strong>Date:</strong> 20/06/23</Box>
        </Box>
        <Box width="70vw" display="flex" justifyContent="space-between" alignItems="center" mt={5}>
          <Box><strong>Patient Name:</strong> Nitesh Bhalala</Box>
          <Box width="13%"><strong>Age:</strong> 20</Box>
        </Box>
      </Box>


      <Box w="75vw" m="auto" mt={10}>
        <Heading fontWeight={"medium"} size="md" mb={5}>
          Prescription:{" "}
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

          {presciptions.map((presciption, i) => {
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
                <Box w="33%">{presciption.medicine}</Box>
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
    </div>
  )
}
