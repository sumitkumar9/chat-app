// import React from 'react'

import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material"
import { sampleUsers } from "../../constants/sampleData"
import UserItem from "../shared/UserItem"
import { useState } from "react";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const selectMemberHandler = (id: string) => {
        console.log(id);
        setSelectedMembers(prev => prev.includes(id) ? prev.filter((current) => current !== id) : [...prev, id]);
    };

    const addMemberSubmitHandler = () => {

    }

    const closeHandler = () => {

    }

  return (
    <Dialog open onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
            <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
            <Stack spacing={"1rem"}>
                {
                    members.length > 0 ? members.map((user) => (
                        <UserItem key={user._id} user={user} handler={selectMemberHandler} />
                    )): <Typography textAlign={"center"}>No Friends</Typography>
                }
            </Stack>
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-evenly"}
            >
                <Button color="error" variant="outlined" onClick={closeHandler}>Cancel</Button>
                <Button variant="contained" onClick={addMemberSubmitHandler}>Submit</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMemberDialog