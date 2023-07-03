import React, { use, useEffect, useState } from 'react'
import {
  Box,
  Text
} from "@chakra-ui/react"
import axios from "@/libs/axios";
import { useRouter } from 'next/router';
import moment from 'moment';

export default function Header() {
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const getDetails = async () => {
      const res = await axios.get(`/main/sessionbyid/?session_id=${router.query.sessionId}`);
      setData(res.data[0]);
    }
    getDetails();
  }, [])
  if (data == null) {
    return null;
  }


  return (
    <div>
      <Box
        mb={"24"}
        position="relative"
        h="40"
        my={4}
        rounded="md"
        bg="gray.200"
        display="flex"
        justifyContent="left"
        alignItems="center"
        pl="40px"
        fontSize="2xl"
      >
        <Box>
          <Box><strong>Title:{" "}</strong>{data.session_name}</Box>
          <Box width="45vw" display="flex" justifyContent="space-between" alignItems="center" mt={3}>
            <Box>
              <Text fontSize={"xl"}>
                First visit: {moment(data.start_date).format("L")}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl">
                Last Visit: {moment(data.end_date).format("L")}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xl">
                No of Visits: {data.num_visit}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}
