import Navbar from "@/components/Navbar";
import {
  Box,
  HStack,
  Input,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Flex,
  Tooltip,
  AvatarBadge,
  Avatar,
  Circle
} from "@chakra-ui/react";
import {
  EmailIcon,
  ChevronRightIcon,
  PhoneIcon,
  Icon
} from "@chakra-ui/icons";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DoctorController from "@/controllers/doctor";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { FaClock, FaMap } from "react-icons/fa";
import Select from "react-select";

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

  const doctorsQuery = useQuery({
    queryFn: DoctorController.getDoctorList,
    queryKey: ["doctors"],
  });

  const [type, setType] = useState("");
  const [other, setOther] = useState("");

  return (
    <div>
      <Navbar />
      <Box maxW="5xl" m="auto" mt={6}>
        <HStack spacing={6}>
          <FormControl mt={4} my={1} >
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name of Doctor"
                value={name}
              />
            </InputGroup>
          </FormControl>
          <FormControl mt={4} my={1} >
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

      <Box mx="auto" maxW="5xl" mt={6}>
        {doctorsQuery.data &&
          doctorsQuery.data.map((doctor) => (
            <Flex
              p={3}
              gap={6}
              alignItems="center"
              rounded="md"
              shadow="sm"
              border="1px"
              borderColor="blackAlpha.100"
              my={3}
              key={doctor.id}
            >
              <Tooltip label={doctor.isAvailable && "Available"}>
                <Avatar size="xl" bg="gray.300" icon={<AiOutlineUser />}>
                  {doctor.isAvailable && (
                    <AvatarBadge boxSize="0.8em" bg="green.500" />
                  )}
                </Avatar>
              </Tooltip>
              <Box flex={1}>
                <HStack>
                  <Text fontSize="2xl" fontWeight="bold">
                    {doctor.firstName} {doctor.lastName}
                  </Text>
                  <Circle size="5px" bg="blackAlpha.400" />
                  <Text fontSize="sm" color="blackAlpha.500">
                    {doctor.userName}
                  </Text>
                </HStack>

                <HStack mt={1} color="blackAlpha.600">
                  <EmailIcon />
                  <Text fontSize="sm">{doctor.email}</Text>
                </HStack>

                <HStack mt={2} gap={7}>
                  <HStack color="blackAlpha.600">
                    <PhoneIcon />
                    <Text fontSize="sm">{doctor.phone}</Text>
                  </HStack>

                  <HStack color="blackAlpha.600">
                    <Icon as={FaClock} />
                    <Text fontSize="sm">{doctor.workingHours}</Text>
                  </HStack>
                </HStack>

                <HStack mt={2} color="blackAlpha.600">
                  <Icon as={FaMap} />
                  <Text fontSize="sm">{doctor.address}</Text>
                </HStack>
              </Box>

              <Link href={`/patient/doctor/${doctor.id}`}>
                <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
              </Link>
            </Flex>
          ))}
      </Box>
    </div>
  )
}