import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { formatRoomName } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Room {
  id: string;
  type: string;
  lastConnectionAt: string;
  createdAt: string;
  metadata: {
    additionalProperties: string;
  };
}

function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleCardClick(name: string) {
    router.push(`/room/${name}`);
  }

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/rooms");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const { data } = await response.json();
        setRooms(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        gap: 4,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {rooms.map((room) => (
        <Card
          key={room.id}
          sx={{ minWidth: 200, cursor: "pointer" }}
          onClick={() => handleCardClick(room.id)}
        >
          <CardContent>
            <Typography variant="h6" component="div">
              {formatRoomName(room.id)}
            </Typography>
            <CardMedia
              component="img"
              image="/assets/shapes-preview.svg"
              height={200}
              alt="shapes preview"
            />
            <Typography variant="body2" color="text.secondary">
              Created at {new Date(room.createdAt).toDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Last visited at {new Date(room.lastConnectionAt).toDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
export default RoomList;
