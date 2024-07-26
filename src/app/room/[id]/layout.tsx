"use client";

import React, { useEffect } from "react";
import { Room } from "@/components/Room";
import { useParams } from "next/navigation";
import { Box } from "@mui/material";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { id } = useParams();
  const roomId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Box
      id="room-container"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      sx={{ width: "100%", height: "100%" }}
    >
      <Room id={roomId}>{children}</Room>
    </Box>
  );
}

export default Layout;
