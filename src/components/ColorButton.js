import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalContext";

export const ColorButton = (props) => {
  const {
    selectedColors,
    setSelectedColors,
    setValue,
    currentLampId,
    markers,
  } = useContext(GlobalContext);

  useEffect(() => {
    let temp = markers.filter((e) => {
      return e.id === currentLampId.toString();
    });

    if (temp[0]) {
      setValue(temp[0].bulbId);

      if (temp[0].colors) {
        console.log(JSON.parse(temp[0].colors));
        setSelectedColors(JSON.parse(temp[0].colors));
      }
    }
  }, [currentLampId]);

  const click = () => {
    props.onClick(props.color);
    let temp = markers.filter((e) => {
      return e.id === currentLampId.toString();
    });
    if (temp[0].colors) {
      console.log(JSON.parse(temp[0].colors));
      setSelectedColors(JSON.parse(temp[0].colors));
    }
    if (selectedColors.find((x) => x === props.color)) {
      setSelectedColors(selectedColors.filter((e) => e !== props.color));
    } else {
      setSelectedColors([...selectedColors, props.color]);
      //   setSelectedColors(selectedColors.push(props.color));
    }
  };

  const onOrOff = () => {
    if (selectedColors.find((x) => x === props.color)) {
      return "On";
    } else {
      return "Off";
    }
  };

  return (
    <div>
      <button onClick={click} style={{ color: `${props.color}` }}>
        {props.color} = {onOrOff()}
      </button>
    </div>
  );
};
