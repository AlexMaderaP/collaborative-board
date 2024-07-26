import React, { useCallback } from "react";
import LiveCursors from "./cursor/LiveCursors";
import { useMyPresence, useOthers } from "@liveblocks/react";
import { Box, Typography } from "@mui/material";

type LiveProps = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
};

function Live({ canvasRef }: LiveProps) {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault();
    updateMyPresence({ cursor: null });
  }, []);

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    updateMyPresence({ cursor: { x, y } });
  }, []);

  return (
    <Box
      id="canvas"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      flexGrow={1}
      sx={{
        width: "100%",
      }}
    >
      <canvas ref={canvasRef} />
      <LiveCursors others={others} />
    </Box>
  );
}

export default Live;
