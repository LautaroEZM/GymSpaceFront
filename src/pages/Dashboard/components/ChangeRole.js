import { useState } from "react";
import { OrangeContainedButton } from "../../../styles/ComponentStyles";
import Dialog from "@mui/material/Dialog";
import { List, ListItem, ListItemButton, Container, DialogTitle, } from "@mui/material";
import axios from 'axios'

function RoleDialog({ handleClose, setSelectedValue, open, setOpen, userID }) {
  const roles = ["Admin", "Coach", "User"];

  const handleRoleChange = async (value, id) => {
    // try {
    //     const userDetailsByIdUrl = `https://gymspacebackend-production-421c.up.railway.app/users/${id}`;
    //     const { data } = await axios.put(userDetailsByIdUrl, {systemRole: value});
    //     if (data) {
            setSelectedValue(value)
            setOpen(false)
    //     }
    //   } catch (error) {
    //     window.alert("Could not create user: " + error.message);
    //   }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select new role</DialogTitle>
      <List>
        {roles.map((role, i) => (
          <ListItem key={i}>
            <ListItemButton onClick={() => handleRoleChange(role, userID)}>
              {role}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function ChangeRole({ role, userID }) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <OrangeContainedButton
        variant="outlined"
        onClick={() => handleClickOpen()}
      >
        { selectedValue || role}
      </OrangeContainedButton>
      <RoleDialog
        handleClose={handleClose}
        setSelectedValue={setSelectedValue}
        open={open}
        setOpen={setOpen}
        userID={userID}
      />
    </div>
  );
}
