import { Box } from "@mui/material";
import CursorSVG from "../../../public/assets/CursorSVG";

type CursorProps = {
  color: string;
  x: number;
  y: number;
};

function Cursor({ color, x, y }: CursorProps) {
  return (
    <Box
      sx={{
        pointerEvents: "none",
        position: "absolute",
        top: 0,
        left: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <CursorSVG color={color} />
    </Box>
  );
}

export default Cursor;
