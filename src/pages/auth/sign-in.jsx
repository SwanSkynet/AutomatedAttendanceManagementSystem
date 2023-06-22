import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useUser } from "@/layouts";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { message } from "antd";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        // console.log("User signed in:", user);
        message.success("Sign In Successful");
        setUser(user);
        user && navigate("/dashboard/home");
      })
      .catch((error) => {
        // Handle authentication error
        message.error("Invalid Email or Password");
        console.log("Authentication error:", error);
      });
  };

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
            Demo admin Login<br/>
            user : admin@ams.com<br/>
            pass : password<br/>
            Demo user Login<br/>
            user : user@ams.com<br/>
            pass : user@123<br/>   
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
