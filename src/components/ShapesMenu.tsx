"use client";

import Image from "next/image";

import { ShapesMenuProps } from "@/types/type";
import {
  Button,
  ClickAwayListener,
  Grow,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useRef, useState } from "react";

const ShapesMenu = ({
  item,
  activeElement,
  handleActiveElement,
}: ShapesMenuProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const isDropdownElem = item.value.some(
    (elem) => elem?.value === activeElement.value
  );

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button ref={anchorRef} onClick={handleClick}>
        <Image
          src={isDropdownElem ? activeElement.icon : item.icon}
          alt={item.name}
          width={24}
          height={24}
        />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                >
                  {item.value.map((elem) => (
                    <MenuItem
                      key={elem?.name}
                      onClick={() => {
                        handleActiveElement(elem);
                        setOpen(false);
                      }}
                    >
                      <ListItemIcon>
                        <Image
                          src={elem?.icon as string}
                          alt={elem?.name as string}
                          width={24}
                          height={24}
                        />
                      </ListItemIcon>
                      <ListItemText>{elem?.name}</ListItemText>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default ShapesMenu;
