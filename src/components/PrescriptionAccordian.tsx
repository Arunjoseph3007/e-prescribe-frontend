import { Visit } from "@/interfaces/visit";
import {
  Box,
  Flex,
  Tag,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Heading,
  Center,
  Icon,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Divider,
} from "@chakra-ui/react";
import Dosage from "@/components/Dosage";
import moment from "moment";
import { CalendarIcon } from "@chakra-ui/icons";
import {
  FaBookMedical,
  FaHeadSideCoughSlash,
  FaQrcode,
  FaThermometerEmpty,
} from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";

interface PrescriptionAccordianProps {
  val: Visit;
}

export default function PrescriptionAccordian({
  val,
}: PrescriptionAccordianProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const uniqueId = `qrcode_e_prescribe_${val.id}`;
  const downLoadImg = () => {
    const link = document.createElement("a");
    link.download = "1.png";
    link.href =
      document
        .querySelector<HTMLCanvasElement>(`#${uniqueId} canvas`)
        ?.toDataURL() || "";
    link.click();
  };

  return (
    <>
      <AccordionItem border="none">
        <AccordionButton>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            mx={3}
          >
            <Box as="span" flex="1" textAlign="left">
              <HStack mt={2} fontWeight={"medium"}>
                <CalendarIcon />
                <Text>{moment(val.date).format("L")}</Text>
              </HStack>
              <Flex maxW="400px" w="full" justifyContent={"space-between"}>
                <HStack fontWeight={"medium"} mt={4}>
                  <Icon as={FaThermometerEmpty} />
                  <Text>{val.temperature ?? "-"} °C</Text>
                </HStack>

                <HStack fontWeight={"medium"} mt={4}>
                  <Icon as={FaBookMedical} />
                  <Text>{val.bloodPressure ?? "-"}</Text>
                </HStack>

                <HStack fontWeight={"medium"} mt={4}>
                  <Icon as={FaHeadSideCoughSlash} />
                  <Text>{val.sugar ?? "-"}</Text>
                </HStack>
              </Flex>
              <Flex gap={4} fontWeight={"medium"} my={4}>
                <Text>Symptoms:</Text>
                <HStack wrap="wrap">
                  {val.symptoms.map((sym, ind) => (
                    <Tag key={ind} size="md">
                      {sym}
                    </Tag>
                  ))}
                </HStack>
              </Flex>
            </Box>

            <VStack
              border="1px"
              borderColor="gray.200"
              overflow="hidden"
              shadow="lg"
              rounded="md"
              onClick={(e) => {
                e.stopPropagation();

                onOpen();
              }}
            >
              <Icon mt={2} mb={1} as={FaQrcode} />
              <Text
                px="10px"
                textTransform="uppercase"
                fontWeight={"bold"}
                bg="green.200"
                color="green.800"
                fontSize={"xs"}
              >
                Get QR
              </Text>
            </VStack>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
        <Heading fontWeight={"medium"} size="md" my="3">
            Notes
          </Heading>
          <Box p={2} bg="blackAlpha.200" rounded="md">
            <Text
              fontWeight="medium"
              whiteSpace="break-spaces"
              my={2}
              size="md"
            >
              {val.note}
            </Text>
          </Box>
          <Heading fontWeight={"medium"} size="md" my="3">
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
              <Heading size="sm" w="40%">
                Medicine
              </Heading>
              <Heading w="30%" size="sm">
                <Center>Days</Center>
              </Heading>
              <Heading textAlign="center" w="30%" size="sm">
                Dosage
              </Heading>
            </Flex>

            {val.prescriptions.map((presciption, i) => {
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
                  <Box w="40%">{presciption.medicine.name}</Box>
                  <Box w="30%">
                    <Center>{presciption.days}</Center>
                  </Box>
                  <Box w="30%">
                    <Center>
                      <Dosage dosage={presciption.dosage} />
                    </Center>
                  </Box>
                </Flex>
              );
            })}
          </Box>
        </AccordionPanel>
      </AccordionItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>QR Code</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div id={uniqueId}>
              <QRCodeCanvas size={400} value={`http://e-pr/qr/hey`} />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={downLoadImg} variant="ghost">
              DOWNLOAD IMAGE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
