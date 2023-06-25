import { Doctor } from "@/interfaces/doctor";

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
      workingHours:'7AM - 9PM',
      address:
        "102B Sarvodaya Swaroop, Telkoswadi, Dr. Nemade Rd, Dombivli (west)",
    };
  });

  return doctors;
};

const DoctorController = {
  getDoctorList,
};

export default DoctorController;
