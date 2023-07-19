
import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PiStudentDuotone } from "react-icons/pi";
import React from "react";
import Avatar from '@mui/material/Avatar';
import Teacher from "./teacher";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from 'react-icons/gi'
import { GiTeacher } from "react-icons/gi";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai"
import { FaBookReader, FaRupeeSign } from "react-icons/fa"
import { Button } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

// import Admission from "./teacher_admission";
const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [menuData, setMenuData] = useState("student");
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(true);
  };

  const navigate = useNavigate();


  const [style, setStyle] = useState("cont");

  const changeStyle = (event) => {
    console.log("you just clicked");

    event.setStyle("cont2");
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/")
  }
  const iconSize = 40;

  return (

    <Drawer
      variant="permanent"
      open={open}
      sx={{ backgroundColor: "#002147", color: "white" }}
    >
      <DrawerHeader sx={{ backgroundColor: "#002147", color: "white" }}>

        <IconButton sx={{
          color: "white"
        }} onClick={() => { setOpen(!open); }}>

          <GiHamburgerMenu />

        </IconButton>
      </DrawerHeader>

      <List sx={{ backgroundColor: "#002147", color: "white", height: "100%" }}>


        <ListItem disablePadding sx={{ display: "block", backgroundColor: '#315278' }} onClick={() => navigate("/admin/profile")}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white"
              }}
            >

              <AccountCircleIcon style={{ fontSize: `${iconSize}px`, backgroundColor: '#315278', color: '#47ffff',marginLeft:'-10px'}} />

            </ListItemIcon>
            <ListItemText
              primary={"Admin"}
              sx={{ opacity: open ? 1 : 0 }}
            >

            </ListItemText>


          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin")}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white"
              }}
            >
              <AiFillHome />
            </ListItemIcon>
            <ListItemText
              primary={"Home"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/student")}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white"
              }}
            >
              <PiStudentDuotone />
            </ListItemIcon>
            <ListItemText
              primary={"Student"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/teacher")}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white"
              }}
            >
              <GiTeacher />
            </ListItemIcon>
            <ListItemText
              primary={"Teacher"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/classes")}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white"
              }}
            >
              <PiStudentDuotone />
            </ListItemIcon>
            <ListItemText
              primary={"classes"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }} onClick={() => navigate("/admin/feesdetails")}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white"
              }}
            >
              <FaRupeeSign />
            </ListItemIcon>
            <ListItemText
              primary={"Fees"}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding sx={{ display: "block" }} onClick={() => logout()}>
          <ListItemButton sx={{ minHeight: 48, justifyContent: open ? "initial" : "center", px: 2.5, }}>
            <ListItemIcon

              sx={{

                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
                color: "white"
              }}
            >
              <AiOutlineLogout />
            </ListItemIcon>

            <ListItemText
              sx={{ opacity: open ? 1 : 0 }}
            >
              <Button className="btn  bg-primary text-white" type="button">Logout</Button>
            </ListItemText>
          </ListItemButton>
        </ListItem>

      </List>

    </Drawer>


  );
}
