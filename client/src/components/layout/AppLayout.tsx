import Header from "./Header";
import Title from "../shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../specific/ChatList";
import { sampleData } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatQuery } from "../../redux/api/api";



const AppLayout = (WrappedComponent: React.ComponentType) => {

  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LayoutComponent = (props: any) => {
    const params = useParams();
    const chatId = params.chatId as string;

    const { data } = useMyChatQuery("");
    console.log("chat-data", data)

    const handleDeleteChat = (e: React.SyntheticEvent,_id: string, groupChat: boolean) => {
      e.preventDefault();

      console.log(_id, groupChat);

    }
    
    return (
      <>
        <Title />
        <Header />
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
          <ChatList handleDeleteChat={handleDeleteChat} chatId={chatId} onlineUsers={["1", "2"]} chats={sampleData} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            height={"100%"}
          >
            <WrappedComponent {...props} />
          </Grid>
          <Grid 
            item 
            md={4} 
            lg={3} 
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0, 0, 0, 0.85)",
            }}
            height={"100%"}
          >
            <Profile/>
          </Grid>
        </Grid>
      </>
    );
  };

  return LayoutComponent;
};

export default AppLayout;
