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
    <div className="tenKField">
      <div className="registered">
        Allready registered ? login here:{" "}
        <div>
          <TextField
            required
            id="loginEmailAdress"
            label="Email-adress"
            value={text.loginEmailAdress ? text.loginEmailAdress : ""}
            onChange={textInputHandler}
          />
          <br /> <br />
          <TextField
            required
            id="loginPassword"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={text.loginPassword ? text.loginPassword : ""}
            onChange={textInputHandler}
          />
          <br />
          <br />
          <Button onClick={loginTextInputHandler}>Login</Button>
        </div>
        <h5 style={{ color: "red" }}>{errorMessages}</h5>
      </div>
      <div className="notRegistered">
        As a registered user, you can run your own events and view your events
        over livestream
        <TextField
          required
          id="emailAdress"
          label="Email-adress"
          onChange={textInputHandler}
          value={text.emailAdress ? text.emailAdress : ""}
        />
        <br /> <br />
        <TextField
          required
          id="password"
          label="password"
          type="password"
          autoComplete="current-password"
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
        <div>
          <TextField
            disabled={!checkBox.recruiter}
            id="companyName"
            label="Company name"
            value={text.companyName ? text.companyName : ""}
            onChange={textInputHandler}
          />
          <br /> <br />
          <TextField
            disabled={!checkBox.recruiter}
            id="aboutCompany"
            label="about company"
            value={text.aboutCompany ? text.aboutCompany : ""}
            onChange={textInputHandler}
          />
          <br /> <br />
          <TextField
            disabled={!checkBox.recruiter}
            id="phoneNumber"
            label="Phone Number"
            value={text.phoneNumber ? text.phoneNumber : ""}
            onChange={textInputHandler}
          />
          <br /> <br />
          <TextField
            disabled={!checkBox.recruiter}
            id="yourName"
            label="Your name"
            value={text.yourName ? text.yourName : ""}
            onChange={textInputHandler}
          />
        </div>
        <Button onClick={sendFormHandler}>Register</Button>
      </div>
    </div>
  );
};

export default LoginCreateUser;
