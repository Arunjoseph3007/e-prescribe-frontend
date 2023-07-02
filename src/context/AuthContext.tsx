import { AuthController } from "@/controllers/auth";
import { TAuthContext, TRegister, TUser } from "@/interfaces/auth";
import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] =
    useState<TAuthContext["status"]>("unauthenticated");
  const router = useRouter();
  const toast = useToast({ isClosable: true });
  const refresQuery = useQuery({
    queryFn: AuthController.refresh,
    queryKey: ["user-auth-details"],
    onSuccess: setUser,
  });
  const loginMutation = useMutation(AuthController.login, {
    onSuccess: (data) => {
      toast({
        status: "success",
        title: "Login Succesfull",
      });
      localStorage.setItem("token", data.token);
      setUser({
        email: data.email,
        id: data.user_id,
        age: data.age,
        userName: data.username,
        isDoctor: data.is_doctor,
        fullName: data.first_name + " " + data.last_name,
      });
      setStatus("authenticated");
      router.push(data.is_doctor ? "/doctor" : "/patient");
    },
    onError: () => {
      toast({
        status: "error",
        title: "Invalid Credentials",
      });
      localStorage.removeItem("token");
      setUser(null);
      setStatus("unauthenticated");
    },
    onSettled: () => {
      setLoading(false);
    },
  });
  const registerMutation = useMutation(AuthController.register, {
    onSuccess: (data) => {
      toast({
        status: "success",
        title: "Successfully registered",
        description: "Check email to verify your account",
      });
      router.push("/login");
    },
    onError: (e: any, data) => {
      if (e.email) {
        toast({
          status: "error",
          title: "Email already exists",
          description: `User with email ${data.email} already exists`,
        });
      } else if (e.username) {
        toast({
          status: "error",
          title: "User already exists",
          description: `User with userName ${data.userName} already exists`,
        });
      } else {
        toast({
          status: "error",
          title: "Something went wrong",
          description: "Make sure you entered details properly",
        });
      }
    },
    onSettled: () => {
      setLoading(false);
    },
  });

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
