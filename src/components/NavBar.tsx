import {
  AppBar,
  Box,
  Button,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import ActiveUsers from "./users/ActiveUsers";
import { navElements } from "@/constants";
import ShapesMenu from "./ShapesMenu";
import { ActiveElement } from "@/types/type";
import Image from "next/image";
import { memo } from "react";
import { useRouter } from "next/navigation";

export type NavbarProps = {
  activeElement: ActiveElement;
  handleActiveElement: (element: ActiveElement) => void;
};

const NavBar = ({ activeElement, handleActiveElement }: NavbarProps) => {
  const router = useRouter();

  const isActive = (value: string | Array<ActiveElement>) =>
    (activeElement && activeElement.value === value) ||
    (Array.isArray(value) &&
      value.some((val) => val?.value === activeElement?.value));

  return (
    <>
      <AppBar>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            <Typography variant="body1">Collaborative Board </Typography>
          </Box>
          <List
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              maxWidth: 500,
            }}
          >
            {navElements.map((item: ActiveElement | any) => (
              <ListItemButton
                key={item.name}
                sx={{
                  paddingY: 0,

                  borderRadius: 5,
                  border: `${
                    isActive(item.value)
                      ? "1px solid rgba(255,255,255,0.4)"
                      : ""
                  }`,
                }}
                selected={isActive(item.value)}
                onClick={() => {
                  if (Array.isArray(item.value)) return;
                  handleActiveElement(item);
                }}
              >
                {Array.isArray(item.value) ? (
                  <ShapesMenu
                    item={item}
                    activeElement={activeElement}
                    handleActiveElement={handleActiveElement}
                  />
                ) : (
                  <Button>
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                  </Button>
                )}
              </ListItemButton>
            ))}
          </List>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ActiveUsers />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default memo(
  NavBar,
  (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement
);
