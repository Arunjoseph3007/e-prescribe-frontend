import { TRegister, TUser } from "@/interfaces/auth";
import axios from "axios";
import axiosWithToken from "@/libs/axios";

const login = async (p: { email: string; password: string }) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND + "/accounts/login/",
    p
  );
  if (!res.data.token) throw new Error("Invalid Credentials");
  return res.data;
};

const register = async (p: TRegister) => {
  const res = await axios.post(
    process.env.NEXT_PUBLIC_BACKEND + "/accounts/register/",
    {
      email: p.email,
      first_name: p.firstName,
      last_name: p.lastName,
      username: p.userName,
      password: p.password,
      age: p.age,
      is_doctor: p.isDoc,
    }
  );
  if (!res.data.old_token) {
    throw res.data;
  }
  return res.data;
};

const refresh = async () => {
  const res = await axiosWithToken.get("/accounts/MyUser/");

  if (!res.data.username) return null;

  const user: TUser = {
    email: res.data.email,
    id: res.data.user_id,
    isDoctor: res.data.is_doctor,
    userName: res.data.username,
    age: res.data.age,
    fullName: res.data.first_name + " " + res.data.last_name,
  };

  return user;
};

export const AuthController = {
  login,
  register,
  refresh,
};
