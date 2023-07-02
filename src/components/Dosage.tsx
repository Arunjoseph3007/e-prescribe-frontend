import { DosageState } from "@/interfaces/prescription";
import { Box, Circle, HStack, Tooltip } from "@chakra-ui/react";

type DosageProps =
  | {
      dosage: DosageState;
      editable: true;
      onMorning: (p: number) => void;
      onAfternoon: (p: number) => void;
      onEvening: (p: number) => void;
    }
  | {
      dosage: DosageState;
      editable?: false;
    };

const DosageToBg = (no: number) => {
  if (no < 0) return "purple.400";
  if (no > 0) return "green.400";
  return "blackAlpha.300";
};

const getLabel = (dose: number, time: string) => {
  if (dose > 0) return "Befor " + time;
  if (dose < 0) return "After " + time;
  return "";
};

export default function Dosage({ dosage, ...props }: DosageProps) {
  return (
    <HStack >
      <Tooltip label={getLabel(dosage.morning, "breakfast")}>
        <Circle
          size="15px"
          transition={"ease"}
          bg={DosageToBg(dosage.morning)}
          cursor={props.editable ? "pointer" : ""}
          onClick={() =>
            props.editable &&
            props.onMorning(dosage.morning == 1 ? -1 : dosage.morning + 1)
          }
        />
      </Tooltip>
      <Box w={{base:"3",md:"10"}} h="2px" bg="blackAlpha.300" />
      <Tooltip label={getLabel(dosage.afternoon, "lunch")}>
        <Circle
          size="15px"
          transition={"ease"}
          bg={DosageToBg(dosage.afternoon)}
          cursor={props.editable ? "pointer" : ""}
          onClick={() =>
            props.editable &&
            props.onAfternoon(dosage.afternoon == 1 ? -1 : dosage.afternoon + 1)
          }
        />
      </Tooltip>
      <Box w={{base:"3",md:"10"}} h="2px" bg="blackAlpha.300" />
      <Tooltip label={getLabel(dosage.evening, "dinner")}>
        <Circle
          size="15px"
          transition={"ease"}
          bg={DosageToBg(dosage.evening)}
          cursor={props.editable ? "pointer" : ""}
          onClick={() =>
            props.editable &&
            props.onEvening(dosage.evening == 1 ? -1 : dosage.evening + 1)
          }
        />
      </Tooltip>
    </HStack>
  );
}
