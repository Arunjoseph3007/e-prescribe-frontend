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

export default function SearchPage() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const [other, setOther] = useState("");
  const doctorsQuery = useQuery({
    queryFn: () => DoctorController.searchDoctors(name, address, type),
    queryKey: ["doctors-search", name, address, type],
  });

  return (
    <div>
      <Navbar />
      <Box maxW="5xl" m="auto" mt={6}>
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
              options={typeOfDoctors.map((type) => ({
                value: type,
                label: type,
              }))}
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

      <Box minH="100vh" mx="auto" maxW="5xl" mt={6}>
        {doctorsQuery.data &&
          doctorsQuery.data.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
      </Box>
    </div>
  );
}
