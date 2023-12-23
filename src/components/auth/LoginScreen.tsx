import { Grid, Button, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../services/auth";

function LoginScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (username !== "" && password !== "") {
        const response = await authService.login(username, password);
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Grid
      container
      sx={{
        height: "100vh",
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Grid>
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Grid container justifyContent={"center"}>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => handleLogin()}
              >
                Login
              </Button>
            </Grid>
            <Grid container justifyContent={"center"}>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => navigate("/register")}
              >
                Create account
              </Button>
            </Grid>{" "}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginScreen;
