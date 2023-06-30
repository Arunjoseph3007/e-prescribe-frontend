import { Doctor } from "@/interfaces/doctor";
import axios from "@/libs/axios";

const getDoctorList = async () => {
  const doctors: Doctor[] = [1, 2, 3, 4, 5].map((e) => {
    return {
      id: e,
      age: 30,
      lastName: "Doe",
      firstName: "John",
      userName: "johnDoe1979",
      phone: "9876543210",
      email: "john.doe@fakemail.com",
      isAvailable: Boolean(Math.floor(Math.random() * 2)),
      workingHours: "7AM - 9PM",
      address:
        "102B Sarvodaya Swaroop, Telkoswadi, Dr. Nemade Rd, Dombivli (west)",
      addrLink: "link",
      type: "Eye Doctor",
      qualification: "MBBS",
    };
  });

  return doctors;
};

const searchDoctors = async (name: string, address: string, type: string) => {
  const res = await axios.get("/accounts/doctorsearch/", {
    params: { name, address, type },
  });
  const now = new Date().getHours();

  const doctors: Doctor[] = (res.data as any[]).map((doc) => ({
    id: doc.id,
    age: 30,
    lastName: doc.last_name,
    firstName: doc.first_name,
    userName: doc.username,
    phone: doc.phonenumber,
    email: doc.email,
    isAvailable: now > doc.clinic_start_time && now < doc.clinic_end_time,
    workingHours: getWorkingHours(doc.clinic_start_time, doc.clinic_end_time),
    address: doc.address,
    addrLink: doc.address_link,
    type: doc.type,
    qualification: doc.qualification,
  }));

  return doctors;
};

const getWorkingHours = (a: number, b: number) => {
  return `${a % 12}${a < 12 ? "AM" : "PM"} - ${b % 12}${b < 12 ? "AM" : "PM"}`;
};

const DoctorController = {
  getDoctorList,
  searchDoctors,
};

export default DoctorController;
