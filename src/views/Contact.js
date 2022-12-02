/////////////////////////////////////Sven's//Coding/ Date: 17-10-2022 15:32 ////////////
// Basic information about this React app
/////////////////////////////////////////gnidoC//s'nevS////////////////////////////////

import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/context/GlobalContext";
import "./Contact.css";

const About = () => {
  const { setActivePage } = useContext(GlobalContext);

  useEffect(() => {
    setActivePage("Contact");
    document.title = "Bottle Luminous: About";
  });

  return (
    <div className="tenKField">
      <div className="contactData">
        Contact:
        <br /> Phone Number: +491738346578 <br />
        Email: Sven@dudink.net
        <br />
        Backend github:{" "}
        <a href=" https://github.com/svendudink/Bottleluminousback">
          {" "}
          https://github.com/svendudink/Bottleluminousback{" "}
        </a>{" "}
        <br /> Frontend Github:
        <a href="https://github.com/svendudink/BottleluminousFront">
          {" "}
          https://github.com/svendudink/BottleluminousFront
        </a>
      </div>
    </div>
  );
};

export default About;

/*  

 <div className="box a">A</div>
      <div className="box b">B</div>
      <div className="box c">C</div>
      <div className="box d">D</div>
      <div className="box e">E</div>
      <div className="box f">F</div>



      */
