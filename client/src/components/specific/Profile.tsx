import { Avatar, Stack, Typography } from '@mui/material';
import { 
  Face as FaceIcon, 
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarMonthIcon
} from '@mui/icons-material';
import moment from 'moment';
import { useAppSelector } from "../../redux/hooks";


const Profile = () => {

  const { user } = useAppSelector((state) => state.auth);

  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={user?.avatar?.url}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading='bio' text='asdf ffd gfd ' />
      <ProfileCard heading='username' text='sumit' Icon={UserNameIcon}/>
      <ProfileCard heading='name' text='Sumit Yadav' Icon={FaceIcon}/>
      <ProfileCard heading='Joined' text= {moment('2025-01-25T00:00:00.000Z').fromNow()} Icon={CalendarMonthIcon}/>
    </Stack>
  )
}

const ProfileCard = ({text, Icon, heading}: {text: string; Icon?: React.ElementType; heading: string}) => (
  <Stack 
    direction={"row"} 
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && <Icon />}
    <Stack>
      <Typography variant='body1'>{text}</Typography>
      <Typography color={"gray"} variant='caption'>{heading}</Typography>
    </Stack>
  </Stack>)

export default Profile