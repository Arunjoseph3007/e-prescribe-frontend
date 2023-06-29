import Navbar from "@/components/Navbar";
import PrescriptionTable from "@/components/PrescriptionTable";
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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import { useImmer } from "use-immer";
import { MdGraphicEq } from "react-icons/md";
import { FaThermometerEmpty } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { postVisit } from "@/controllers/visits";
import { Visit } from "@/interfaces/visit";

const emptyPrescription: PrescriptionState = {
  medicine: {
    id: 0,
    name: "",
  },
  days: 1,
  dosage: {
    morning: 0,
    afternoon: 0,
    evening: 0,
  },
};

export default function NewVisit() {
  const toast = useToast();
  const router = useRouter();
  const [newSymptom, setNewSymptom] = useState("");
  const [desc, setDesc] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [presciptions, setPrescriptions] = useImmer<PrescriptionState[]>([
    emptyPrescription,
  ]);
  const [sugar, setSugar] = useState(120);
  const [bp, setBp] = useState([80, 120]);
  const [temperature, setTemperature] = useState(37);
  const createVisitMutation = useMutation({
    mutationFn: (v: Omit<Visit, "id" | "date">) =>
      postVisit(v, +(router.query.sessionId as string)),
    onSuccess: () => {
      toast({
        status: "success",
        title: "Visit added succefully",
      });
      router.push(`/doctor/session/${router.query.sessionId}`);
    },
    onError: () => {
      toast({
        status: "error",
        title: "OOPS! Something went wrong",
      });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    createVisitMutation.mutate({
      note: desc,
      symptoms,
      bloodPressure: `${bp[0]}/${bp[1]}`,
      sugar,
      temperature,
      prescriptions: presciptions.filter((p) => p.medicine.name),
    });
  };

  return (
    <main>
      <Head>
        <title>Add New Visit</title>
      </Head>
      <Navbar />
      <Box maxW="6xl" mx="auto">
        {/* //` STATS */}
        <Box h="56" my={4} rounded="md" bg="gray.200"></Box>

        {/* //` New session form */}
        <Box mx="auto" maxW="4xl">
          <Heading px={3}>Add New Session</Heading>
          <Divider />

          <Box
            as="form"
            onSubmit={handleSubmit}
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
                <Textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={5}
                  placeholder="Enter Description"
                />
              </InputGroup>
            </FormControl>

            <FormControl my={3}>
              <FormLabel>Symptoms</FormLabel>
              <InputGroup>
                <Input
                  value={newSymptom}
                  onChange={(e) => setNewSymptom(e.target.value)}
                  placeholder="Eg. cough"
                />
                <InputRightAddon
                  cursor="pointer"
                  textColor={"white"}
                  fontWeight={"bold"}
                  bgColor={"green.400"}
                  onClick={() => {
                    if (!newSymptom) return;
                    setSymptoms((prev) => [...prev, newSymptom]);
                    setNewSymptom("");
                  }}
                >
                  <AddIcon mr={3} />
                  Add
                </InputRightAddon>
              </InputGroup>
            </FormControl>

            <HStack wrap="wrap" my={3}>
              {symptoms.map((symptom, i) => (
                <Tag size="lg" key={i}>
                  <TagLabel>{symptom}</TagLabel>
                  <TagRightIcon
                    cursor={"pointer"}
                    onClick={() =>
                      setSymptoms((prev) => prev.filter((_, idx) => idx != i))
                    }
                  >
                    <CloseIcon />
                  </TagRightIcon>
                </Tag>
              ))}
            </HStack>

            <Flex gap={3}>
              <FormControl my={3} isRequired>
                <FormLabel>Temperature</FormLabel>
                <InputGroup>
                  <Slider
                    onChange={setTemperature}
                    aria-label="slider-ex-4"
                    defaultValue={30}
                  >
                    <SliderTrack bg="green.100">
                      <SliderFilledTrack bg="green" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Box color="green" as={FaThermometerEmpty} />
                    </SliderThumb>
                  </Slider>
                </InputGroup>
              </FormControl>

              <FormControl my={3} isRequired>
                <FormLabel>Blood Pressure</FormLabel>
                <InputGroup>
                  <RangeSlider
                    onChange={setBp}
                    aria-label={["min", "max"]}
                    value={bp}
                    min={40}
                    max={300}
                  >
                    <RangeSliderTrack bg="green.100">
                      <RangeSliderFilledTrack bg="green" />
                    </RangeSliderTrack>
                    <RangeSliderThumb boxSize={6} index={0}>
                      <Box color="green" as={MdGraphicEq} />
                    </RangeSliderThumb>
                    <RangeSliderThumb boxSize={6} index={1}>
                      <Box color="green" as={MdGraphicEq} />
                    </RangeSliderThumb>
                  </RangeSlider>
                </InputGroup>
              </FormControl>

              <FormControl my={3} isRequired>
                <FormLabel>Blood sugar level</FormLabel>
                <InputGroup>
                  <Slider
                    onChange={setSugar}
                    aria-label="slider-ex-4"
                    defaultValue={30}
                  >
                    <SliderTrack bg="green.100">
                      <SliderFilledTrack bg="green" />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                      <Box color="green" as={MdGraphicEq} />
                    </SliderThumb>
                  </Slider>
                </InputGroup>
              </FormControl>
            </Flex>

            {/* //` Prescription */}
            <FormControl my={3}>
              <FormLabel>Prescriptions</FormLabel>
              <PrescriptionTable
                presciptions={presciptions}
                setPrescriptions={setPrescriptions}
              />
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

            {/* //` Submit */}
            <Divider />
            <Flex gap={2} my={3}>
              <Button flex={1} variant={"outline"}>
                Cancel
              </Button>
              <Button type="submit" flex={1}>
                Submit
              </Button>
            </Flex>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
