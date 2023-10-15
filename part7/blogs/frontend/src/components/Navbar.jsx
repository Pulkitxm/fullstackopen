import React from "react";
import {useNavigate} from 'react-router-dom'
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddHomeIcon from "@mui/icons-material/AddHome";
import GroupIcon from "@mui/icons-material/Group";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Navbar = ({setOpen}) => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navStyling = {
    backgroundColor:"rgb(223 223 223)"
  }

  return (
    <BottomNavigation style={navStyling} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<AddHomeIcon />}
        onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        label="Users"
        value="Users"
        icon={<GroupIcon />}
        onClick={() => navigate("/users")}
      />
    </BottomNavigation>
  );
};

export default Navbar;
