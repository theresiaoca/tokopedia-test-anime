import { useLocation } from "react-router-dom";

import {
  BottomMenuItem,
  BottomMenuLink,
  BottomNavbar,
} from "./BottomNavigationBarCss";

import { MENU_LIST } from "../constants";

const BottomNavigationBar = () => {
  const location = useLocation();

  return (
    <BottomNavbar>
      {MENU_LIST.map((r: { path: string; text: string }, index: number) => (
        <BottomMenuItem key={index}>
          <BottomMenuLink
            className={location.pathname === r.path ? "active" : ""}
            to={r.path}
          >
            {r.text || ""}
          </BottomMenuLink>
        </BottomMenuItem>
      ))}
    </BottomNavbar>
  );
};

export default BottomNavigationBar;
