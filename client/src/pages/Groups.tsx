// import React from 'react'

import { KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Box, Drawer, Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvtarCard from "../components/shared/AvtarCard";
import { sampleData } from "../constants/sampleData";

const Groups = () => {

  const chatId = useSearchParams()[0].get("group") || "";


  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateBack = () => {
    navigate("/");
  }

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }

  const handleMobileClose = () => setIsMobileMenuOpen(false);

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
      </Grid>

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
