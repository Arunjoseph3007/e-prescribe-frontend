import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/reactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthContextProvider from "@/context/AuthContext";
import ChakraUIProvider from "@/libs/chakraUI";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChakraUIProvider>
          <Component {...pageProps} />
        </ChakraUIProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
