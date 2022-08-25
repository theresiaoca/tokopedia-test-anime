import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const NavBar = styled.div`
  display: flex;
  background-color: #668bad;
  padding: 10px 20px;
  justify-content: space-between;
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MenuLink = styled(Link)`
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;

  &:hover {
    color: #98b1c8;
  }
`;

export const LeftNavBar = styled.div`
  display: flex;
`;

export const RightNavBar = styled.div`
  display: flex;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const LogoText = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: white
`