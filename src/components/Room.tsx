"use client";

import { ReactNode } from "react";
import { RoomProvider } from "../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react/suspense";
import { LiveMap } from "@liveblocks/client";
import { CircularProgress } from "@mui/material";

export function Room({ children, id }: { children: ReactNode; id: string }) {
  return (
    <RoomProvider
      id={id}
      initialPresence={{}}
      initialStorage={{ canvasObjects: new LiveMap() }}
    >
      <ClientSideSuspense fallback={<CircularProgress />}>
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
