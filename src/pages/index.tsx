import Head from "next/head";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>E Prescibe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Flex  mx="auto" maxW="6xl" justify='space-between'>
          <Box pt="36">
            <Heading size="2xl">E-Prescribe</Heading>
            <Text mt={8} textColor="GrayText" maxW="400px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              placeat voluptate odio dolorum voluptatem magni suscipit? Natus
              neque dolorem error, nam asperiores quasi sequi ad. Vel nam
              architecto numquam doloremque!
            </Text>

            <Flex mt={4} gap={4}>
              <Button as={Link} href="/login" colorScheme="green">
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                colorScheme="green"
                variant="outline"
              >
                SignUp
              </Button>
            </Flex>
          </Box>

          <Box>image</Box>
        </Flex>
      </main>
    </>
  );
}
