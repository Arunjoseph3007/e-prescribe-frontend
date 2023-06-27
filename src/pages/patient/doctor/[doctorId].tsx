import {
    Heading,
    Flex,
    Box,
    Text,
    Link
} from "@chakra-ui/react"

import {
    ChevronRightIcon
} from "@chakra-ui/icons"
// import moment from "moment";
import Navbar from "@/components/Navbar"

const sessions = [
    {
        id: 0,
        title: "Cough and cold",
        lastVisit: "23/03/23",
        startDate: "a month ago",
        noOfVisits: 4
    },
    {
        id: 1,
        title: "Fever",
        lastVisit: "23/03/23",
        startDate: "a month ago",
        noOfVisits: 4
    },
    {
        id: 2,
        title: "Malaria",
        lastVisit: "23/03/23",
        startDate: "a month ago",
        noOfVisits: 4
    },
    {
        id: 3,
        title: "Dengue",
        lastVisit: "23/03/23",
        startDate: "a month ago",
        noOfVisits: 4
    },

]

export default function DoctorPage() {
    return (
        <div>
            <Navbar />
            {sessions.map((session) => (
                <Flex
                    mx="auto"
                    maxW="4xl"
                    my={4}
                    p={3}
                    rounded="md"
                    h="24"
                    alignItems={"center"}
                    shadow="md"
                    borderWidth={1}
                    borderColor="gray.100"
                    key={session.id}
                >
                    <Box flex={1}>
                        <Heading fontWeight={"medium"} size="md">
                            {session.title}
                        </Heading>
                        <Text fontSize={"sm"} color="GrayText">
                            Last visit {session.lastVisit}
                        </Text>
                        <Flex fontWeight="medium" gap={2}>
                            <Text fontSize="sm">
                                No Of Visits: {session.noOfVisits}
                            </Text>
                            <Text fontSize="sm">
                                Started: {session.startDate}
                            </Text>
                        </Flex>
                    </Box>
                    <Link href={`/patient/session/${session.id}`}>
                        <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
                    </Link>
                </Flex>
            ))}
        </div>)
}