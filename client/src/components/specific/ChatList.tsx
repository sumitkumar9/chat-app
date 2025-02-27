import { Stack } from "@mui/material";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers,
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}: {
  w?: string;
  chats?: {
    avatar: string[];
    name: string;
    _id: string;
    groupChat: boolean;
    members: string[];
    newMessageAlert: boolean;
  }[];
  chatId: string;
  onlineUsers: unknown[];
  newMessagesAlert?: { chatId: string; count: number }[];
  handleDeleteChat: ( e: React.SyntheticEvent,
    _id: string,
    groupChat: boolean) => void;
}) => {
  return (
    <Stack width={w} direction="column">
      {chats?.map((chat, index) => {
        const { avatar, name, _id, groupChat, members } = chat;
        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        ) || { chatId: "", count: 0 };
        const isOnline = members?.some(() => onlineUsers.includes(_id));
        return (
          <ChatItem
            newMessageAlert={newMessageAlert}
            isOnline={isOnline} 
            avatar={avatar}
            name={name}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
            index={index}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
