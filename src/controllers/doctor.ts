import { Doctor } from "@/interfaces/doctor";
import axios from "@/libs/axios";

const getDoctorList = async () => {
  const { data } = await axios.get(`/main/patientgetdoctor/`);
  const now = new Date().getHours();
  const doctors: Doctor[] = (data as any[]).map((doc) => {
    return {
      id: doc.doctor,
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
      profilePic: process.env.NEXT_PUBLIC_BACKEND + doc.profile_pic,
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
    id: doc.doctor,
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
    profilePic: process.env.NEXT_PUBLIC_BACKEND + doc.profile_pic,
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
