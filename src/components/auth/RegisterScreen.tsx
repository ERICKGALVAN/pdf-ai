import { Box, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../services/auth";

function RegisterScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (username !== "" && password !== "") {
        const reponse = await authService.createAccount(username, password);
        if (reponse.status === 200) {
          localStorage.setItem("token", reponse.data.token);
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      alignContent={"center"}
      justifyContent={"center"}
      component="main"
      sx={{ height: "100vh", backgroundColor: "grey.400" }}
      padding={"20px"}
    >
      <Grid item xs={12} sm={8} md={5} height={"90vh"}>
        <Box
          sx={{
            padding: "20px",
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
            />

            <Grid container justifyContent={"center"}>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => handleRegister()}
              >
                Register
              </Button>
            </Grid>

            <Grid container justifyContent={"center"}>
              <Button
                sx={{ textTransform: "none" }}
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </Button>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}

export default RegisterScreen;
