import { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { useFileHandler, useInputValidation } from '6pp';
import { usernameValidator } from "../utils/validators";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(!isLogin);

  const name = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const bio = useInputValidation("");
  const password = useInputValidation("");

  const avtar = useFileHandler("single");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("sign");
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleLogin}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="username"
                name="username"
                autoComplete="username"
                variant="outlined"
                autoFocus
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={toggleLogin}
              >
                Sign Up
              </Button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h5">Sign Up</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={handleSignUp}>
              <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    objectFit: "contain",
                  }}
                  src={avtar.preview || undefined}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAlt />
                    <VisuallyHiddenInput type="file" onChange={avtar.changeHandler} />
                  </>
                </IconButton>
              </Stack>
              {
                avtar.error && <Typography color={"error"} variant="caption">{avtar.error}</Typography>
              }
              <TextField
                margin="normal"
                required
                fullWidth
                label="name"
                name="name"
                autoComplete="name"
                variant="outlined"
                autoFocus
                value={name.value}
                onChange={name.changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="username"
                name="username"
                autoComplete="username"
                variant="outlined"
                autoFocus
                value={username.value}
                onChange={username.changeHandler}
              />
              {
                username.error && <Typography color={"error"} variant="caption">{username.error}</Typography>
              }
              <TextField
                margin="normal"
                required
                fullWidth
                label="bio"
                name="bio"
                autoComplete="bio"
                variant="outlined"
                autoFocus
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Sign Up
              </Button>
              <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={toggleLogin}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
