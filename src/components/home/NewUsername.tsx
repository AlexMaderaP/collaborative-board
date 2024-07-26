import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

type NewUsernameProps = {
  open: boolean;
  onClose: () => void;
  setUser: Dispatch<SetStateAction<string>>;
};

export default function NewUsername({
  open,
  onClose,
  setUser,
}: NewUsernameProps) {
  const [error, setError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const username = formJson.username;
    if (username.trim() === "") {
      setError(true);
    } else {
      setError(false);
      setUser(username);
      onClose();
    }
  }

  return (
    <Dialog
      disableRestoreFocus
      open={open}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Enter your name</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          required
          id="username"
          name="username"
          label="Username"
          fullWidth
          variant="outlined"
          error={error}
          helperText={
            error ? "Username is required" : "Please provide your username"
          }
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
