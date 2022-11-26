import { createContext, useEffect, useState, useRef, useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const { activePage, setActivePage } = useContext(GlobalContext);

  const [errorMessages, setErrorMessages] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [text, setText] = useState({
    emailAdress: "",
    password: "",
    aboutCompany: "",
    companyName: "",
    phoneNumber: "",
    yourName: "",
    loginEmailAdress: "",
    loginPassword: "",
  });

  const userData = useRef({});
  /////////////////////////////////////Sven's//Coding/ Date: 22-11-2022 15:20 ////////////
  // personalData is grouped as:
  // 0. firstname
  // 1. country
  //
  //
  //
  //
  /////////////////////////////////////////gnidoC//s'nevS////////////////////////////////
  console.log(activePage);

  useEffect(() => {
    setErrorMessages("");
  }, [activePage]);

  const UserGraphQLHandler = async (request, personalData) => {
    console.log(personalData);
    const requestList = [
      `mutation {
  createUser(userInput: {emailAdress:"${personalData.emailAdress}", password:"${personalData.password}", aboutCompany: "${personalData.aboutCompany}", companyName: "${personalData.companyName}", phoneNumber: "${personalData.phoneNumber}", yourName: "${personalData.yourName}" })
  
  {
    _id
    emailAdress
    password
  }}
`,
      `{
        login(emailAdress: "${personalData.loginEmailAdress}", password: "${personalData.loginPassword}"){
          token
          userId
        }
      }
`,
    ];
    console.log(requestList[request]);
    const graphglQuery = {
      query: requestList[request],
    };
    await fetch("https://bottle.hopto.org:8080/graphql", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(graphglQuery),
    })
      .then((res) => res.json())
      .then((resData) => (userData.current = resData));

    console.log("second");
    console.log(userData.current);

    if (userData.current.errors) {
      console.log("check", userData.current.errors[0].message);
      setErrorMessages(userData.current.errors[0].message);
      setText({
        emailAdress: "",
        password: "",
        aboutCompany: "",
        companyName: "",
        phoneNumber: "",
        yourName: "",
        loginEmailAdress: "",
        loginPassword: "",
      });

      console.log(errorMessages);
    }

    if (userData.current.data.login.token) {
      localStorage.setItem("token", userData.current.data.login.token);

      setLoggedIn(true);
      setErrorMessages("");
      setText({
        emailAdress: "",
        password: "",
        aboutCompany: "",
        companyName: "",
        phoneNumber: "",
        yourName: "",
        loginEmailAdress: "",
        loginPassword: "",
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        UserGraphQLHandler,
        userData,
        loggedIn,
        setLoggedIn,
        errorMessages,
        setErrorMessages,
        text,
        setText,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
