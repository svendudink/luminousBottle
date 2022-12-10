/////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:32 ////////////
// Basic information about this React app
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import { useLocation } from "react-router-dom";
import "./Contact.css";
import { UserContext } from "../components/context/UserContext";

const RecruiterVideo = (props) => {
  const routes = [{ path: "/recruiterVideo/:id" }];

  console.log(routes);

  const {
    UserGraphQLHandler,
    userData,
    errorMessages,
    text,
    setText,
    messages,
    personalInfo,
  } = useContext(UserContext);

  const { setActivePage } = useContext(GlobalContext);

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    (async () => {
      setActivePage("Recruitervideo");
      document.title = "Bottle Luminous: Recruiter video";
      //const cutId = location.pathname.split("/")[2];

      UserGraphQLHandler(2, {
        id: location.pathname.split("/")[2],
        token: location.pathname.split("/")[3],
      });
    })();
  }, []);

  return (
    <div>
      <p>
        {" "}
        Welcome: {personalInfo.yourName}, to your personalized recruiter space,
        in the next days you will find here my personalized Video resume
      </p>
    </div>
  );
};

export default RecruiterVideo;
