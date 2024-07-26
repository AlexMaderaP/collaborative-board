"use client";

import NewUsername from "@/components/home/NewUsername";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeNavBar from "@/components/home/HomeNavBar";
import RoomList from "@/components/home/RoomList";
import { useUser } from "@/context/useUser";

function Page() {
  const { user, setUser } = useUser();
  const [open, setOpen] = useState(user === "");
  const [roomName, setRoomName] = useState("");
  const router = useRouter();

  const handleCreateRoom = () => {
    const newRoomName = roomName.trim().replace(/\s+/g, "-");
    if (newRoomName !== "") {
      router.push(`/room/${newRoomName}`);
    }
  };

  return (
    <>
      <HomeNavBar user={user} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ width: "100%" }}
      >
        <Box>
          <Typography variant="h3">Create Your Own Room</Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateRoom();
            }}
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            <TextField
              label="Room Name"
              required
              variant="outlined"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Box>
        </Box>
        <Box textAlign="center">
          <Typography variant="h3">Join an Existing Room</Typography>
          <RoomList />
        </Box>
      </Box>
      <NewUsername
        open={open}
        onClose={() => setOpen(false)}
        setUser={setUser}
      />
    </>
  );
}

export default Page;
