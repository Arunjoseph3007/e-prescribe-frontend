import Navbar from "@/components/Navbar";
import {
  Box,
  HStack,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DoctorController from "@/controllers/doctor";
import Select from "react-select";
import DoctorCard from "@/components/DoctorCard";

const typeOfDoctors = [
  "Skin Doctor",
  "Eye Doctor",
  "Pediatrician",
  "Gynocolegist",
  "Heart Specialist",
  "Surgeon",
  "Other",
];

const emptyType = {
  value: "",
  label: "None",
};

export default function SearchPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState(emptyType);
  const [other, setOther] = useState("");
  const doctorsQuery = useQuery({
    queryFn: () =>
      DoctorController.searchDoctors(
        name,
        address,
        type.label == "Other" ? other : type.value
      ),
    queryKey: [
      "doctors-search",
      name,
      address,
      type.label == "Other" ? other : type.value,
    ],
  });

  return (
    <div>
      <Navbar />
      <Box w="95vw" maxW="5xl" m="auto" mt={6}>
        <HStack spacing={6}>
          <FormControl mt={4} my={1}>
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name of Doctor"
                value={name}
              />
            </InputGroup>
          </FormControl>
          <FormControl mt={4} my={1}>
            <FormLabel>Address</FormLabel>
            <InputGroup>
              <Input
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                value={address}
              />
            </InputGroup>
          </FormControl>

          <FormControl mt={4} my={1}>
            <FormLabel>Type</FormLabel>
            <Select
              onChange={(s) => setType(s)}
              options={[
                emptyType,
                ...typeOfDoctors.map((type) => ({
                  value: type,
                  label: type,
                })),
              ]}
            />
          </FormControl>

          {type?.label === "Other" && (
            <FormControl mt={4} my={1}>
              <FormLabel>Type</FormLabel>
              <InputGroup>
                <Input
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  placeholder="Specify..."
                />
              </InputGroup>
            </FormControl>
          )}
        </HStack>
      </Box>

      <Box w="95vw" minH="100vh" mx="auto" maxW="5xl" mt={6}>
        {doctorsQuery.data &&
          doctorsQuery.data.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
      </Box>
    </div>
  );
}
