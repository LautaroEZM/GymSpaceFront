import { useState, useEffect } from "react";
import { OrangeContainedButton } from "../../../styles/ComponentStyles";
import Dialog from "@mui/material/Dialog";
import {
  List,
  ListItem,
  ListItemButton,
  Container,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../../utils/constants";
import { buildReq } from "../../../utils/auth0utils";
import { async } from "q";

function RoleDialog({
  handleClose,
  setSelectedValue,
  open,
  setOpen,
  userID,
}) {
  const roles = ["Admin", "Coach", "User"];

  const handleRoleChange = (value, id) => {
    console.log(id);
    setSelectedValue(value);
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select new role</DialogTitle>
      <List>
        {roles.map((role, i) => (
          <ListItem key={i}>
            <ListItemButton onClick={() => handleRoleChange(role)}>
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

  console.log('id: ',  userID);

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
        Role {selectedValue || role}
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
