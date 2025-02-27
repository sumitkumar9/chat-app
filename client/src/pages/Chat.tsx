import { IconButton, Stack } from "@mui/material";
import AppLayout from "../components/layout/AppLayout"
import { useRef } from "react";
import { grayColor, orange } from "../constants/color";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
// import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";

const Chat = () => {

  const user = {
    _id: "asds45-43ffd-54fhf",
    name: "Sumit Kumar Yadav"
  }

  const containedRef = useRef(null);


  return (
    <>
      <Stack
        ref={containedRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      >
      {
        sampleMessage.map((message,i) => (
          <MessageComponent key={i} message={message} user={user}/>
        ))
      }
      </Stack>
      <form
        style={{
          height: "10%",
        }}
      >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg"
            }}
          >
            <AttachFileIcon/>
          </IconButton>
          <InputBox placeholder="Type Message here..."/>
          <IconButton type="submit"
            sx={{
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark"
              }
            }}
          >
            <SendIcon/>
          </IconButton>
        </Stack>
      </form>
      {/* <FileMenu/> */}
    </>
  )
}

const WrappedChat = AppLayout(Chat); // Assign to a named variable

export default WrappedChat;