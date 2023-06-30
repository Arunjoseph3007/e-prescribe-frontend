import { MedicineController } from "@/controllers/medicine";
import { Medicine } from "@/interfaces/medicine";
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  useOutsideClick,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface MedicineInputProps {
  medicine: Medicine;
  setMed: (med: Medicine) => void;
}

export default function MedicineInput({
  medicine,
  setMed,
}: MedicineInputProps) {
  const [medQuery, setMedQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>();
  const [isVisible, setIsVisible] = useState(false);
  const medSearchQuery = useQuery({
    queryFn: () => MedicineController.searchMedicine(medQuery),
    queryKey: ["med-search", medQuery],
    enabled: !!medQuery,
  });

  useEffect(() => {
    if (medQuery) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [medQuery]);

  useOutsideClick({
    //@ts-ignore
    ref: modalRef,
    handler: () => {
      if (isVisible) {
        setIsVisible(false);
      }
    },
  });

  return (
    <Editable
      onChange={setMedQuery}
      value={isVisible ? medQuery : medicine.name}
      placeholder="Enter"
      pr={4}
      flex={1}
      position="relative"
    >
      <EditablePreview />
      <EditableInput />
      {medSearchQuery.data && isVisible && (
        <Box
          //@ts-ignore
          ref={modalRef}
          zIndex={999}
          bg="white"
          rounded="md"
          p={1}
          top="120%"
          position="absolute"
          border="1px"
          borderColor="gray.200"
          shadow="xl"
        >
          {medSearchQuery.data.map((med) => (
            <Text
              p={2}
              w="200px"
              tabIndex={0}
              key={med.id}
              rounded="md"
              cursor="pointer"
              _focus={{ bg: "blue.50" }}
              _hover={{ bg: "blue.100" }}
              onClick={() => {
                setMed(med);
                setIsVisible(false);
                setMedQuery("");
              }}
            >
              {med.name}
            </Text>
          ))}
        </Box>
      )}
    </Editable>
  );
}
