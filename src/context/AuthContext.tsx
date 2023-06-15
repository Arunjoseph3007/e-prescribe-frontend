import { TAuthContext, TRegister, TUser } from "@/interfaces/auth";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useState } from "react";

const AuthContext = createContext<TAuthContext>({
  user: null,
  loading: false,
  status: "unauthenticated",
  login() {},
  register() {},
  logout() {},
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const toast = useToast({ isClosable: true });
  const loginMutation = useMutation(
    async (p: { email: string; password: string }) => {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND + "/accounts/login/",
        p
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast({
          status: "success",
          title: "Login Succesfull",
        });
        localStorage.setItem("token", data.token);
        setUser({
          email: data.email,
          id: data.user_id,
          userName: data.username,
        });
        setStatus("authenticated");
        router.push("/home");
      },
      onError: () => {
        toast({
          status: "error",
          title: "Something went wrong",
        });
        localStorage.removeItem("token");
        setUser(null);
        setStatus("unauthenticated");
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );
  const registerMutation = useMutation(
    async (p: TRegister) => {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND + "/accounts/register/",
        {
          email: p.email,
          first_name: p.firstName,
          last_name: p.lastName,
          user_name: p.userName,
          password: p.password,
        }
      );
      return res.data;
    },
    {
      onSuccess: (data) => {
        toast({
          status: "success",
          title: "Successfully registered",
        });
        router.push("/login");
      },
      onError: () => {
        toast({
          status: "error",
          title: "Something went wrong",
        });
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] =
    useState<TAuthContext["status"]>("unauthenticated");

  const login = (email: string, password: string) => {
    setLoading(true);
    loginMutation.mutate({ email, password });
  };

  const register = (p: TRegister) => {
    setLoading(true);
    registerMutation.mutate(p);
  };

  const logout = () => {
    setStatus("unauthenticated");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, status, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
