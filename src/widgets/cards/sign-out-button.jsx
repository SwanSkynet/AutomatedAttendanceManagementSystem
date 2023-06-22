import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/layouts";
import { auth } from "@/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { message } from "antd";
export function SignOutButton(props) {
  const { setUser } = useUser();

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
        message.success("Sign Out Successful");
      })
      .catch((error) => {
        // An error happened.
        message.error("Sign Out Failed");
      });
    navigate("/sign-in");
  };

  return (
    <Button
      variant={"gradient"}
      color={props.sidenavColor}
      className="flex items-center justify-center gap-4 px-4  capitalize"
      fullWidth
      onClick={handleSignOut}
    >
      <Typography color="inherit" className="font-medium capitalize">
        SignOut
      </Typography>
    </Button>
  );
}
export default SignOutButton;
