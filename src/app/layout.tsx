import type { Metadata } from "next";
import "./globals.css";
import { Box } from "@mui/material";
import { UserContextProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Collaborative Board",
  description:
    "A collaborative borad using Fabric.js and Liveblocks for real-time collab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          <Box
            sx={{
              height: "100vh",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        </UserContextProvider>
      </body>
    </html>
  );
}
