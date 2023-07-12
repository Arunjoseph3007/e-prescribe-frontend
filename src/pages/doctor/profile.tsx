import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { DoctorProfileController } from "@/controllers/doctorProfile";
import { EditIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import Select from "react-select";

const typeOfDoctors = [
  "Skin Doctor",
  "Eye Doctor",
  "Pediatrician",
  "Gynocolegist",
  "Heart Specialist",
  "Surgeon",
  "Other",
] as const;

export type TTypeOfDoctor = (typeof typeOfDoctors)[number];

export default function DoctorProfile() {
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const [img, setImg] = useState<File | null>(null);
  const [mobile, setMobile] = useState("");
  const [qualification, setQualification] = useState("");
  const [workingHours, setWorkingHours] = useState({
    start: "07:00",
    end: "21:00",
  });
  const [addr, setAddr] = useState("");
  const [addrLink, setAddrLink] = useState("");
  const [type, setType] = useState<{
    value: TTypeOfDoctor;
    label: TTypeOfDoctor;
  }>();
  const [other, setOther] = useState("");

  const postProfileMutation = useMutation({
    mutationFn: DoctorProfileController.postDoctorProfile,
    onSuccess: () => {
      toast({
        status: "success",
        title: "Profile Updated",
      });
      router.push("/doctor");
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    postProfileMutation.mutate({
      address: addr,
      addrLink,
      endTime: +workingHours.end.split(":")[0],
      startTime: +workingHours.start.split(":")[0],
      mobile,
      qualification,
      type: type?.label != "Other" ? type!.label : other,
      id: +user!.id,
      profilePic: img!,
    });
  };

  return (
    <main>
      <Navbar />
      <Box
        onSubmit={handleSubmit}
        as="form"
        mb="100px"
        maxW="4xl"
        mx="auto"
        w="95%"
      >
        <Heading my={5}>Update Your Profile</Heading>
        <Flex gap={10}>
          <VStack>
            <Avatar
              src={img ? URL.createObjectURL(img) : ""}
              size="2xl"
              bg="gray.300"
              icon={<AiOutlineUser />}
            >
              <Input
                //@ts-ignore
                onInput={(e) => setImg(e.target.files[0])}
                display={"none"}
                id="img_input"
                type="file"
              />
              <Circle
                cursor="pointer"
                as="label"
                htmlFor="img_input"
                border={"4px"}
                borderColor="white"
                p={2}
                bg="gray.700"
                position="absolute"
                bottom={0}
                right={0}
              >
                <EditIcon fontSize={"lg"} />

              </Circle>
            </Avatar>
            <Text fontSize="2xl" fontWeight="bold">
              {user?.fullName}
            </Text>
            <Text fontSize="sm" color="blackAlpha.500">
              {user?.userName}
            </Text>
          </VStack>

          <Box flex="1">
            <HStack>
              <FormControl mt={4} my={1} isRequired>
                <FormLabel>Mobile No</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    placeholder="987654321"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4} my={1} isRequired>
                <FormLabel>Qualification</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => setQualification(e.target.value)}
                    value={qualification}
                    placeholder="Eg. MBBS"
                  />
                </InputGroup>
              </FormControl>
            </HStack>

            <Flex alignItems="baseline" gap={2}>
              <FormControl mt={4} my={1} isRequired>
                <FormLabel>Working Hours</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) =>
                      setWorkingHours((p) => ({ ...p, start: e.target.value }))
                    }
                    value={workingHours.start}
                    type="time"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4} my={1}>
                <FormLabel color="transparent"> t</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) =>
                      setWorkingHours((p) => ({ ...p, end: e.target.value }))
                    }
                    value={workingHours.end}
                    type="time"
                  />
                </InputGroup>
              </FormControl>
            </Flex>

            <HStack>
              <FormControl mt={4} my={1}>
                <FormLabel>Type</FormLabel>
                <Select
                  onChange={(s) => setType(s as any)}
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

            <FormControl mt={4} my={1} isRequired>
              <FormLabel>Address</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => setAddr(e.target.value)}
                  value={addr}
                  placeholder="Eg. 102/B Buckingham Palace, Pennslyvania, New York"
                />
              </InputGroup>
            </FormControl>

            <FormControl mt={4} my={1}>
              <FormLabel>Address Link</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => setAddrLink(e.target.value)}
                  type="url"
                  value={addrLink}
                  placeholder="Enter your locations google map link"
                />
                <InputRightElement>
                  <LinkIcon />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              isLoading={postProfileMutation.isLoading}
              type="submit"
              mt={2}
              w="full"
            >
              Update Profile
            </Button>
          </Box>
        </Flex>
      </Box>
    </main>
  );
}
