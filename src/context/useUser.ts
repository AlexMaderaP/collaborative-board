import { useContext } from "react";
import { UserContext } from "./UserContext";

export function useUser() {
  const value = useContext(UserContext);
  if (value == null) {
    throw new Error("Must use User withing provider");
  }
  return value;
}
