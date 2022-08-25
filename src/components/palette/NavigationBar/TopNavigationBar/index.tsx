import { useLocation } from "react-router-dom";

import {
  LeftNavBar,
  LogoText,
  MenuItem,
  MenuLink,
  NavBar,
  RightNavBar,
} from "./TopNavigationBarCss";

import { MENU_LIST } from "../constants";

const TopNavigationBar = () => {
  const location = useLocation();

  return (
    <NavBar>
      <LeftNavBar>
        <MenuItem>
          <LogoText>ANIME!</LogoText>
        </MenuItem>
      </LeftNavBar>
      <RightNavBar>
        {MENU_LIST.map((r: { path: string; text: string }, index: number) => (
          <MenuItem key={index}>
            <MenuLink
              className={location.pathname === r.path ? "active" : ""}
              to={r.path}
            >
              {r.text || ""}
            </MenuLink>
          </MenuItem>
        ))}
      </RightNavBar>
    </NavBar>
  );
};

export default TopNavigationBar;
