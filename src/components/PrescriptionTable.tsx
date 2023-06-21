import { PrescriptionState } from "@/interfaces/prescription";
import { Updater } from "use-immer";
import Dosage from "@/components/Dosage";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  Button,
  Heading,
  Box,
  Text,
  Center,
  Tooltip,
  Editable,
  EditableInput,
  EditablePreview,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

interface PrescriptionTableProps {
  presciptions: PrescriptionState[];
  setPrescriptions: Updater<PrescriptionState[]>;
}

export default function PrescriptionTable({
  presciptions,
  setPrescriptions,
}: PrescriptionTableProps) {
  return (
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
          <Box w={28}>
            <NumberInput
              min={1}
              max={20}
              maxW={"70px"}
              value={presciption.days}
              onChange={(_, no) =>
                setPrescriptions((p) => {
                  p[i].days = no;
                })
              }
            >
              <NumberInputField fontWeight={"bold"} />
              <NumberInputStepper>
                <NumberIncrementStepper border="none" />
                <NumberDecrementStepper border="none" />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Text w={200}>
            <Center>
              <Dosage
                editable
                dosage={presciption.dosage}
                onMorning={(no) =>
                  setPrescriptions((p) => {
                    p[i].dosage.morning = no;
                  })
                }
                onAfternoon={(no) =>
                  setPrescriptions((p) => {
                    p[i].dosage.afternoon = no;
                  })
                }
                onEvening={(no) =>
                  setPrescriptions((p) => {
                    p[i].dosage.evening = no;
                  })
                }
              />
            </Center>
          </Text>
          <Center w={28}>
            <Tooltip label="Remove">
              <Button
                onClick={() =>
                  setPrescriptions((prev) => prev.filter((_, idx) => i != idx))
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
  );
}
