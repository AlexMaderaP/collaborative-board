import { NextResponse } from "next/server";

export const revalidate = 0;

async function getRooms() {
  const response = await fetch("https://api.liveblocks.io/v2/rooms", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LIVEBLOCKS_SECRET_KEY}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch rooms");
  }
  return response.json();
}

export async function GET() {
  try {
    const rooms = await getRooms();
    return NextResponse.json(rooms, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
