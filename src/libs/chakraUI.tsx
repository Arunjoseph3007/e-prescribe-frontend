import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";

export default function ChakraUIProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ChakraProvider
      toastOptions={{
        defaultOptions: { position: "bottom-right", isClosable: true },
      }}
    >
      {children}
    </ChakraProvider>
  );
}
