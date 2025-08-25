import React, { useState } from "react";
import { Box, Button, Field, Input, Stack } from "@chakra-ui/react";
import { PasswordInput } from "./ui/password-input";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      localStorage.setItem("token", data.token || "dummyToken");

      onLoginSuccess();
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <Box width="300px" m="auto" pt="24">
      <form onSubmit={handleSubmit}>
        <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
          <Field.Root orientation="horizontal">
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Field.Root>

          <Field.Root orientation="horizontal">
            <Field.Label>Password</Field.Label>
            <PasswordInput
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </Field.Root>

          <Button type="submit" loading={isLoading} disabled={isLoading}>
            {isLoading ? "Logging in..." : "LOGIN"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
