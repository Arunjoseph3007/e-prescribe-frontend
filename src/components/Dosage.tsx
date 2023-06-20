import { DosageState } from "@/interfaces/prescription";
import { Box, Circle, HStack } from "@chakra-ui/react";

interface DosageProps {
  dosage: DosageState;
}

const DosageToBg = (no: number) => {
  if (no < 0) return "purple.400";
  if (no > 0) return "green.400";
  return "blackAlpha.300";
};

export default function Dosage({ dosage }: DosageProps) {
  return (
    <HStack>
      <Circle size="13px" bg={DosageToBg(dosage.morning)} />
      <Box w={"10"} h="2px" bg="blackAlpha.300" />
      <Circle size="13px" bg={DosageToBg(dosage.afternoon)} />
      <Box w={"10"} h="2px" bg="blackAlpha.300" />
      <Circle size="13px" bg={DosageToBg(dosage.evening)} />
    </HStack>
  );
}
