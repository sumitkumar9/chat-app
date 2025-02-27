import { memo } from "react";
import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from "@mui/material"
import { sampleNotification } from "../../constants/sampleData"


const Notifications = () => {
  const friendRequestHandler = ({_id, accept}: {_id: string; accept: boolean}) => {

  }
  return (
    <Dialog open>
      <Stack p={{xs: "1rem", sm: "2rem"}} maxWidth={"25rem"}>
        <DialogTitle>Notification</DialogTitle>
        {
          sampleNotification.length > 0 ? (
            sampleNotification.map((i) => <NotificationItem sender={i.sender} _id={i._id} handler={({ _id, accept }: { _id: string; accept: boolean }) => friendRequestHandler({ _id, accept })} key={i._id} />)
          ) : (
            <Typography textAlign={"center"} >0 Notifications</Typography>
          )
        }
      </Stack>
    </Dialog>
  )
}

const NotificationItem = memo(({ sender, _id, handler }: {sender: {name: string; avatar: string}, _id: string, handler:({_id, accept}: {_id: string; accept: boolean}) => void}) => {
  const {name, avatar} = sender;
  return <ListItem>
  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
      <Avatar src={avatar} />
      <Typography
          variant='body1'
          sx={{
              flexGlow: 1,
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%"
          }}
      >
          {`${name} sent you a request`}
      </Typography>
      <Stack
        direction={{
          xs: "column",
          sm: "row"
        }}
      >
        <Button onClick={() => handler({_id, accept: true})}>Accept</Button>
        <Button color="error" onClick={() => handler({_id, accept: false})}>Reject</Button>
      </Stack>
  </Stack>
</ListItem>
})

export default Notifications