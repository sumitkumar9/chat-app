import { memo } from "react";
import { Link } from "../styles/StyledComponents";
import { Box, Stack, Typography } from "@mui/material";
import AvtarCard from "./AvtarCard";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}: {
  avatar: string[];
  name: string;
  _id: string;
  groupChat: boolean;
  sameSender: boolean;
  isOnline: boolean;
  newMessageAlert: { count: number, chatId: string };
  index: number;
  handleDeleteChat: (
    e: React.SyntheticEvent,
    _id: string,
    groupChat: boolean
  ) => void;
}) => {
  return (
    <Link
      sx={{
        padding: 0,
         
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) =>{ console.log("oncontext"); handleDeleteChat(e, _id, groupChat)}}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        <AvtarCard avatar={avatar} />

        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>
        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
