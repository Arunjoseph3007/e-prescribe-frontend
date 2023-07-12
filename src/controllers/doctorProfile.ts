import { TDoctorProfilePost } from "@/interfaces/doctorProfile";
import axios from "@/libs/axios";
import { toFormData } from "axios";

const postDoctorProfile = async (profile: TDoctorProfilePost) => {
  const res = await axios.post(
    "/accounts/doctordetails/",
    toFormData({
      doctor: profile.id,
      address: profile.address,
      address_link: profile.addrLink,
      phonenumber: profile.mobile,
      clinic_start_time: profile.startTime,
      clinic_end_time: profile.endTime,
      qualification: profile.qualification,
      type: profile.type,
      profile_pic: profile.profilePic,
    }),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const DoctorProfileController = {
  postDoctorProfile,
};
