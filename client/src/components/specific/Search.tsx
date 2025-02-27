import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useInputValidation } from "6pp";
import UserItem from "../shared/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { useState } from "react";


const Search = () => {
  const search = useInputValidation("");

  const isLoadingSendFriendRequest = false;

  const [users, setUsers] = useState(sampleUsers);

  const addFriendHandler = (id: string) => {
    console.log(id);
  }

  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
               <SearchIcon/>
              </InputAdornment>
            )
          }}
        />

        <List>
          {
            users.map((user) => (
              <UserItem 
                user={user} 
                key={user._id} 
                handler={addFriendHandler} 
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          }
        </List>
      </Stack>
      Hii
    </Dialog>
  )
}

export default Search