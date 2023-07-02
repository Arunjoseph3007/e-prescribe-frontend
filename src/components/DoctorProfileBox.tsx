import {
  Box,
  HStack,
  Text,
  Flex,
  Tooltip,
  Avatar,
  Circle,
  Tag,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon, Icon, LinkIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { FaClock, FaMap, FaUserGraduate } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import DoctorController from "@/controllers/doctor";

interface DoctorCardProps {
  id: string;
}

export default function DoctorProfileBox({ id }: DoctorCardProps) {
  const { data: doctor } = useQuery({
    queryFn: () => DoctorController.getDoctorById(id),
    queryKey: ["doctor-details", id],
    enabled: !!id,
  });

  if (!doctor) return <Box h="56" my={4} rounded="md" bg="gray.200"></Box>;

  return (
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
        <Avatar
          src={doctor.profilePic}
          size="xl"
          bg="gray.300"
          icon={<AiOutlineUser />}
        />
      </Tooltip>
      <Box flex={1}>
        <HStack>
          <Text fontSize="2xl" fontWeight="bold">
            {doctor.firstName} {doctor.lastName}
          </Text>
          <Circle size="5px" bg="blackAlpha.400" />
          <Text flex={1} fontSize="sm" color="blackAlpha.500">
            {doctor.userName}
          </Text>

          <Tag textTransform={"capitalize"}>{doctor.type}</Tag>
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

          <HStack color="blackAlpha.600">
            <Icon as={FaUserGraduate} />
            <Text fontSize="sm">{doctor.qualification}</Text>
          </HStack>
        </HStack>

        <Link target="_blank" href={doctor.addrLink || ""}>
          <HStack mt={2} color="blackAlpha.600">
            <Icon as={FaMap} />
            <Text noOfLines={1} fontSize="sm">
              {doctor.address}
            </Text>
            <LinkIcon />
          </HStack>
        </Link>
      </Box>
    </Flex>
  );
}
