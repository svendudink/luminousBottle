import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import { TextField } from "@mui/material";
import { Checkbox, Button } from "@mui/material";
import { UserContext } from "../components/context/UserContext";

const LoginCreateUser = () => {
  const { setActivePage } = useContext(GlobalContext);
  const { UserGraphQLHandler, userData, errorMessages, text, setText } =
    useContext(UserContext);

  const [checkBox, setCheckBox] = useState({});

  console.log(userData.current);
  console.log(errorMessages);

  useEffect(() => {
    setActivePage("LoginCreateUser");
    document.title = "Bottle Luminous: Login or create a user";
  });

  const textInputHandler = (e) => {
    setText({ ...text, [e.target.id]: e.target.value });
    console.log(text);
  };

  const checkBoxHandler = (e) => {
    setCheckBox({ ...text, [e.target.id]: e.target.checked });
    console.log(checkBox);
  };

  const sendFormHandler = () => {
    UserGraphQLHandler(0, text);
  };

  const loginTextInputHandler = (e) => {
    UserGraphQLHandler(1, text);
  };

  return (
    <div>
      <div>
        Allready registered ? login here:{" "}
        <div>
          <TextField
            id="loginEmailAdress"
            label="Email-adress"
            value={text.loginEmailAdress ? text.loginEmailAdress : ""}
            onChange={textInputHandler}
          />
          <TextField
            id="loginPassword"
            label="Password"
            value={text.loginPassword ? text.loginPassword : ""}
            onChange={textInputHandler}
          />
          <Button onClick={loginTextInputHandler}>Login</Button>
        </div>
        <h5 style={{ color: "red" }}>{errorMessages}</h5>
      </div>
      As a registered user, you can run your own events and view your events
      over livestream
      <div>
        <TextField
          id="emailAdress"
          label="Email-adress"
          onChange={textInputHandler}
          value={text.emailAdress ? text.emailAdress : ""}
        />
        <br />
        <TextField
          id="password"
          label="password"
          value={text.password ? text.password : ""}
          onChange={textInputHandler}
        />
        <br />
        Are you a recruiter and are you interested in hiring me as a
        Web-Developer/Programmer?
        <Checkbox
          id={"recruiter"}
          onClick={checkBoxHandler}
          value={checkBox.recruiter ? checkBox.recruiter : false}
        />
        <br />
        {checkBox.recruiter && (
          <div>
            <TextField
              id="aboutCompany"
              label="about company"
              value={text.aboutCompany ? text.aboutCompany : ""}
              onChange={textInputHandler}
            />
            <br />
            <TextField
              id="companyName"
              label="Company name"
              value={text.companyName ? text.companyName : ""}
              onChange={textInputHandler}
            />
            <br />
            <TextField
              id="phoneNumber"
              label="Phone Number"
              value={text.phoneNumber ? text.phoneNumber : ""}
              onChange={textInputHandler}
            />

            <br />
            <TextField
              id="yourName"
              label="Your name"
              value={text.yourName ? text.yourName : ""}
              onChange={textInputHandler}
            />
          </div>
        )}
        <Button onClick={sendFormHandler}>Send</Button>
      </div>
    </div>
  );
};

export default LoginCreateUser;
