import { ReactNode } from "react";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";

const theme = extendTheme(withDefaultColorScheme({ colorScheme: "green" }));

export default function ChakraUIProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: { position: "bottom-right", isClosable: true },
      }}
    >
      {children}
    </ChakraProvider>
  );
}
