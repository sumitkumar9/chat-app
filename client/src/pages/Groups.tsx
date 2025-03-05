// import React from 'react'

import { 
        Add as AddIcon,
        Delete as DeleteIcon,
        Done as DoneIcon,
        Edit as EditIcon,
        KeyboardBackspace as KeyboardBackspaceIcon,
        Menu as MenuIcon 
      } from "@mui/icons-material";
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvtarCard from "../components/shared/AvtarCard";
import { sampleData, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"));
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"));

const Groups = () => {

  const chatId = useSearchParams()[0].get("group") || "";


  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isAddMember = false;

  const navigateBack = () => {
    navigate("/");
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const updateGroupName = () => {
    setIsEdit(true);
    console.log("update group name")
  }

  const openConfirmDeletedHandler = () => {
    setIsDeleteDialogOpen(true);
    console.log("confirm delete")
  }

  const closeConfirmDeletedHandler = () => {  
    setIsDeleteDialogOpen(false);
  }

  const openAddMemberHandler = () => {
    console.log("open add member")
  }

  const deleteHandler = () => {
    console.log("delete");
    setIsDeleteDialogOpen(false);
  }

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const removeMemberHandler = (id: string) => {
    console.log("remove member", id);
  }

  console.log("GroupName", groupName);
  useEffect(() => {
    if (chatId) {
      console.log("chatId", chatId);
      setGroupName(`Group ${chatId}`);
      setGroupNameUpdatedValue(`Group ${chatId}`);
    }

    // return () => {
    //   setGroupName("");
    //   setGroupNameUpdatedValue("");
    //   setIsEdit(false);
    // }
  }, [chatId])

  const IconBtns = (
  <>
    <Box
    sx={{
      display: {
        xs: "block",
        sm: "none",
        position: "fixed",
        right: "1rem",
        top: "1rem"
      }
    }}
    >
    <IconButton onClick={handleMobile}>
      <MenuIcon />
    </IconButton>
    </Box>
    <Tooltip title='back'>
      <IconButton
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: "rgba(0,0,0,0.8)",
          color: "white",
          ":hover": {
            bgcolor: "rgba(0,0,0,0.7)"
          }
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>)

  const GroupName = (<Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
    {
      isEdit ? <>
        <TextField
        value={groupNameUpdatedValue}
        onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
        />
        <IconButton onClick={() => setIsEdit(false)}><DoneIcon/></IconButton>
      </> : <>
        <Typography variant={"h4"}>
          {groupName || "Group Name"}
        </Typography>
        <IconButton onClick={updateGroupName}><EditIcon/></IconButton>
      </>
    }
  </Stack>)

  const ButtonGroup = (
  <Stack
    direction={{
      xs: "column-reverse",
      sm: "row",
    }}
    spacing={"1rem"}
    p={{
      xs: "0",
      sm: "1rem",
      md: "1rem 4rem"
    }}
    >
      <Button size="large" color="error" variant="outlined" startIcon={<DeleteIcon/>} onClick={openConfirmDeletedHandler}>Delete Group</Button>
      <Button size="large" variant="contained" startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add Member</Button>

  </Stack>)
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block"
          }
        }}
        sm={4}
        bgcolor={'bisque'}
      >
       <GroupList w={"100%"} myGroups={sampleData} chatId={chatId} />
      </Grid>

      <Grid 
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem"
        }}
      >
        Group details
        {IconBtns}

        {
          groupName && <>
          
          {GroupName}
          <Typography
            margin={"2rem"}
            alignSelf={"flex-start"}
            variant="body1"

          >
            memebers
          </Typography>
          <Stack
            maxWidth={"45rem"}
            width={"100%"}
            boxSizing={"border-box"}
            padding={{
              xs: "0",
              sm: "1rem",
              md: "1rem 4rem"
            }}
            spacing={"2rem"}
            bgcolor={"bisque"}
            height={"50vh"}
            overflow={"auto"}
          >
            {/* memebers */}

            {
              sampleUsers.map((user) => (
                <UserItem user={user} isAdded={true} styling={{
                  boxShadow: "0 0 1rem rgba(0,0,0,0.2)",
                  padding: "1rem 2rem",
                  borderRadius: "1rem"
                }}
                handler={removeMemberHandler}
                key={user._id}
              />
              ))
            }
          </Stack>
          
          {ButtonGroup}
          </>
        }

      </Grid>
        {
          isAddMember && <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog/>
          </Suspense>
        }
        {
          isDeleteDialogOpen && (
            <Suspense fallback={<Backdrop open/>}>
              <ConfirmDeleteDialog
                open={isDeleteDialogOpen}
                handleClose={closeConfirmDeletedHandler}
                deleteHandler={deleteHandler}
              />
            </Suspense>
          )
        }
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none"
          }
        }}
       open={isMobileMenuOpen} 
       onClose={handleMobileClose}
       >
        <GroupList w={"50vw"} myGroups={sampleData} chatId={chatId} />
      </Drawer>
    </Grid>
  )
}

const GroupList = ({w='100', myGroups=[], chatId}:{w: string; myGroups: unknown[]; chatId: string}) => (
  <Stack width={w}>
    {
      myGroups.length > 0 ? (
        myGroups.map((group, i) => {
          return <GroupListItem group={group} chatId={chatId} key={i} />
        })
      ): (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      )
    }
  </Stack>
)

const GroupListItem = memo(({ group, chatId }: {group: unknown, chatId: string}) => {

  const  { name, avatar, _id } = group;

  return <Link to={`?group=${_id}`} onClick={(e) =>{
    if (chatId === _id)  e.preventDefault()
  }}>
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <AvtarCard avatar={avatar} />
      <Typography>
        {name}
      </Typography>
    </Stack>
  </Link>
});
export default Groups
