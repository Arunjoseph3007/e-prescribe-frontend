import {
  Box,
  HStack,
  Text,
  Flex,
  Tooltip,
  AvatarBadge,
  Avatar,
  Circle,
  Tag,
} from "@chakra-ui/react";
import {
  EmailIcon,
  ChevronRightIcon,
  PhoneIcon,
  Icon,
  LinkIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { FaClock, FaMap, FaUserGraduate } from "react-icons/fa";
import { Doctor } from "@/interfaces/doctor";

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
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
        >
          {doctor.isAvailable && <AvatarBadge boxSize="0.8em" bg="green.500" />}
        </Avatar>
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

        <Link target="_blank" href={doctor.addrLink}>
          <HStack mt={2} color="blackAlpha.600">
            <Icon as={FaMap} />
            <Text noOfLines={1} fontSize="sm">
              {doctor.address}
            </Text>
            <LinkIcon />
          </HStack>
        </Link>
      </Box>

      <Link href={`/patient/doctor/${doctor.id}`}>
        <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
      </Link>
    </Flex>
  );
}
