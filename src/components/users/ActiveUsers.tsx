"use client";
import { Avatar } from "@/components/users/Avatar";
import { useOthers, useSelf } from "@liveblocks/react";
import styles from "./index.module.css";
import { Box } from "@mui/material";
import { useMemo } from "react";
import { useUser } from "@/context/useUser";

export default function ActiveUsers() {
  const { user } = useUser();
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;
  const memoizedUsers = useMemo(
    () => (
      <Box
        component="main"
        sx={{
          display: "flex",
          userSelect: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            paddingLeft: 3,
          }}
        >
          {currentUser && <Avatar name={user} />}
          {users.slice(0, 3).map(({ connectionId }) => {
            return <Avatar key={connectionId} name="Other" />;
          })}

          {hasMoreUsers && (
            <div className={styles.more}>+{users.length - 3}</div>
          )}
        </Box>
      </Box>
    ),
    [users.length, user]
  );
  return memoizedUsers;
}
