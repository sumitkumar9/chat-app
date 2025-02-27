import { Box, Typography } from "@mui/material"
import AppLayout from "../components/layout/AppLayout"
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"} >
        Select a Friend to chat
      </Typography>
    </Box>
  )
}

const WrappedHome = AppLayout(Home); // Assign to a named variable
export default WrappedHome;