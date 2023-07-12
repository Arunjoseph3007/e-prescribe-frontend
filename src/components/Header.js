import React, { useEffect, useState } from 'react'
import {
  Box,
  Text,
  Heading
} from "@chakra-ui/react"
import axios from "@/libs/axios";
import { useRouter } from 'next/router';
import moment from 'moment';

export default function Header() {
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getDetails = async () => {
      if(!router.query.sessionId){
        return ;
      }
      const res = await axios.get(`/main/sessionbyid/?session_id=${router.query.sessionId}`);
      setData(res.data[0]);
    }
    getDetails();
  }, [router.query.sessionId])  
  if (data == null) {
    return null;
  }


  return (
    <div>
      <Box
        mb={"24"}
        position="relative"
        my={4}
        rounded="md"
        bg="gray.200"
        display="flex-col"
        justifyContent="center"
        alignItems="center"
        // pl="40px"
        fontSize="2xl"
        p={6}
      >
        {/* <Box> */}
          <Box display="flex" alignItems="center" justifyContent="center">
            <Heading color='green.500'>{data.session_name}</Heading>
          </Box>
          <Box display="flex" justifyContent="space-evenly" alignItems="center" mt={3}>
            <Box>
              <Text fontSize={"xl"}>
                First visit: {moment(data.start_date).format("L")}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl">
                No of Visits: {data.num_visit}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl">
                Last Visit: {moment(data.end_date).format("L")}
              </Text>
            </Box>
          </Box>
        </Box>
      {/* </Box> */}
    </div>
  )
}
