import * as React from "react";
import { useEffect, useReducer } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import ContentCut from "@mui/icons-material/ContentCut";

import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";

import { GlobalContext } from "./context/GlobalContext";

export default function IconMenu(props) {
  const {
    bulbIdList,
    GraphQLHandler,
    activeMap,
    markers,
    currentBulbId,
    setCurrentBulbId,
    value,
    setValue,
    setButtonPopup,
    currentLampId,
  } = React.useContext(GlobalContext);

  const [, forceRerender] = useReducer((x) => x + 1, 0);

  const options = [
    { label: value ? value : "Not assigned" },
    ...Object.keys(bulbIdList).map((e) => {
      return { label: e, value: e };
    }),
  ];

  useEffect(() => {
    let temp = markers.filter((e) => {
      return e.id === currentLampId.toString();
    });

    if (temp[0]) {
      setValue(temp[0].bulbId);
    }
  }, [currentLampId]);

  const handleChange = async (event) => {
    setCurrentBulbId(event.target.value);
    console.log(event.target.value);
    setValue(event.target.value);
    await GraphQLHandler(
      props.id,
      "lat",
      "lng",
      "updateBulbId",
      activeMap,
      event.target.value
    );

    // await markers.forEach((element) => {
    //   if (element.id === props.id) {
    //     element.bulbId = event.target.value;
    //   }
    // });
  };

  let QrHandler = () => {
    setButtonPopup(true);
  };

  // TODO: from the markers list we need the bulbID from the array of objects identified with the props.id

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select
          key={Math.random()}
          value={value === null ? undefined : value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={Math.random()} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  };

  return (
    <Paper sx={{ width: 300, maxWidth: "100%" }}>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="large" />
          </ListItemIcon>
          <ListItemText>Lamp {props.id}</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘X
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ContentCopy fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <div>
              <Dropdown
                label="BulbId:"
                options={options}
                value={value}
                onChange={handleChange}
              />
            </div>
          </ListItemText>
          <Typography variant="body2" color="text.secondary">
            <button onClick={QrHandler}>Scan</button>
          </Typography>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <button onClick={(e) => props.handleClick(e, 100)}></button>
            <ContentPaste fontSize="small" />
          </ListItemIcon>

          <ListItemText>Paste</ListItemText>
          <Typography variant="body2" color="text.secondary"></Typography>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Cloud fontSize="small" />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
