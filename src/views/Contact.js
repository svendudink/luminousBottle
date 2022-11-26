/////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:32 ////////////
// Basic information about this React app
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";

const About = () => {
  const { setActivePage } = useContext(GlobalContext);

  useEffect(() => {
    setActivePage("Contact");
    document.title = "Bottle Luminous: About";
  });

  return (
    <div>
      Contact:
      <br /> Phone Number: +491738346578 <br />
      Email: Sven@dudink.net
      <br />
      Backend github: https://github.com/svendudink/Bottleluminousback <br />{" "}
      Frontend Github: https://github.com/svendudink/BottleluminousFront
    </div>
  );
};

export default About;
