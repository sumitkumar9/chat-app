import { Dialog, Stack, DialogTitle, TextField, Typography, Button } from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useState } from "react";

const NewGroup = () => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const submitHandler = () => {

  }

  const onCloseHandler = () => {

  }
  
  const groupName = useInputValidation("");

  const selectMemberHandler = (id: string) => {
    console.log(id);
    setSelectedMembers(prev => prev.includes(id) ? prev.filter((current) => current !== id) : [...prev, id]);
  };
  console.log(selectedMembers);
  return (
    <Dialog open onClose={onCloseHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h5">New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
        <Typography variant="body1">
          Members
        </Typography>
        <Stack>
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error">Cancel</Button>
          <Button variant="contained" onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
