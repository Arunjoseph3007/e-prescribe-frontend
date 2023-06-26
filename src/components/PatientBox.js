import {
    Flex,
    Box, 
    Heading,
    Link,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export default function PatientBox(props) {
    return (
        <div>
            <Flex
                mx="auto"
                maxW="5xl"
                my={4}
                p={3}
                rounded="md"
                h="24"
                alignItems={"center"}
                shadow="md"
                borderWidth={1}
                borderColor="gray.100"
            >
                <Box flex={1}>
                    <Heading fontWeight={"medium"} size="md">
                        Name: {props.name}
                    </Heading>
                    <Heading fontWeight={"medium"} size="md">
                        Age:{props.age}
                    </Heading>
                </Box>
                <Link href={`/doctor/patient/${props.username}`}>
                    <ChevronRightIcon fontSize={"4xl"} color={"GrayText"} />
                </Link>
            </Flex>
        </div>
    )
}
