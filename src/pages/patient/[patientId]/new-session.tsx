import Dosage from "@/components/Dosage";
import Navbar from "@/components/Navbar";
import { PrescriptionState } from "@/interfaces/prescription";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  Button,
  Heading,
  Box,
  Divider,
  FormControl,
  FormLabel,
  InputGroup,
  Textarea,
  Tag,
  TagLabel,
  TagRightIcon,
  HStack,
  InputRightAddon,
  Text,
  Center,
  Tooltip,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useImmer } from "use-immer";

const emptyPrescription: PrescriptionState = {
  medicine: "",
  days: 1,
  dosage: {
    morning: 0,
    afternoon: 0,
    evening: 0,
  },
};

export default function NewSession() {
  const router = useRouter();
  const [newSymptom,setNewSymptom]=useState('')
  const [symptoms, setSymptoms] = useState<string[]>([
    "cough",
    "fever",
    "Diarrhea",
  ]);
  const [presciptions, setPrescriptions] = useImmer<PrescriptionState[]>([]);

  return (
    <main>
      <Head>
        <title>New session</title>
      </Head>
      <Navbar />
      <Box maxW="6xl" mx="auto">
        {/* //` STATS */}
        <Box h="56" my={4} rounded="md" bg="gray.200"></Box>

        {/* //` New session form */}
        <Box mx="auto" maxW="4xl">
          <Heading>Add New Session</Heading>
          <Divider />

          <Box
            as="form"
            my={4}
            mb={32}
            p={3}
            rounded="md"
            alignItems={"center"}
            shadow="md"
            borderWidth={1}
            borderColor="gray.100"
          >
            <FormControl my={3} isRequired>
              <FormLabel>Description</FormLabel>
              <InputGroup>
                <Textarea rows={5} placeholder="Enter Description" />
              </InputGroup>
            </FormControl>

            <FormControl my={3} isRequired>
              <FormLabel>Symptoms</FormLabel>
              <InputGroup>
                <Input placeholder="Eg. cough" />
                <InputRightAddon
                  cursor="pointer"
                  textColor={"white"}
                  fontWeight={"bold"}
                  bgColor={"green.400"}
                  onClick={()=>setSymptoms(prev=>[...prev])}
                >
                  <AddIcon mr={3} />
                  Add
                </InputRightAddon>
              </InputGroup>
            </FormControl>

            <HStack my={3}>
              {symptoms.map((symptom, i) => (
                <Tag size="lg" key={i}>
                  <TagLabel>{symptom}</TagLabel>
                  <TagRightIcon>
                    <AddIcon />
                  </TagRightIcon>
                </Tag>
              ))}
            </HStack>

            {/* //` Prescription */}
            <FormControl my={3}>
              <FormLabel>Prescriptions</FormLabel>
              <Box rounded="md" border={"2px"} borderColor={"gray.100"}>
                <Flex
                  borderBottom={"1px"}
                  borderColor={"blackAlpha.200"}
                  p={3}
                  px={4}
                  color={""}
                  fontSize={"sm"}
                >
                  <Heading size="sm" flex={1}>
                    Medicine
                  </Heading>
                  <Heading w={28} size="sm">
                    Days
                  </Heading>
                  <Heading textAlign="center" w={200} size="sm">
                    Dosage
                  </Heading>
                  <Heading textAlign={"center"} w={"28"} size="sm">
                    Action
                  </Heading>
                </Flex>

                {presciptions.map((presciption, i) => (
                  <Flex
                    color="blackAlpha.600"
                    alignItems="center"
                    borderBottom={"1px"}
                    borderColor={"blackAlpha.200"}
                    fontWeight={"bold"}
                    key={i}
                    p={1}
                    px={4}
                    fontSize={"sm"}
                  >
                    <Editable
                      onChange={(val) =>
                        setPrescriptions((state) => {
                          state[i].medicine = val;
                        })
                      }
                      placeholder="Enter"
                      pr={4}
                      value={presciption.medicine.toUpperCase()}
                      flex={1}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                    <Text w={28}>{presciption.days}</Text>
                    <Text w={200}>
                      <Center>
                        <Dosage dosage={presciption.dosage} />
                      </Center>
                    </Text>
                    <Center w={28}>
                      <Tooltip label="Remove">
                        <Button
                          onClick={() =>
                            setPrescriptions((prev) =>
                              prev.filter((_, idx) => i != idx)
                            )
                          }
                          variant={"ghost"}
                        >
                          <CloseIcon />
                        </Button>
                      </Tooltip>
                    </Center>
                  </Flex>
                ))}
              </Box>
              <Button
                onClick={() => {
                  setPrescriptions((prev) => {
                    prev.push(emptyPrescription);
                  });
                }}
                my={3}
                w="full"
                leftIcon={<AddIcon />}
              >
                New Prescription
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
