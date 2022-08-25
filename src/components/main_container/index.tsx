import React from "react";

import BottomNavigationBar from "../palette/NavigationBar/BottomNavigationBar";
import TopNavigationBar from "../palette/NavigationBar/TopNavigationBar";

export type MainContainerProps = {
  children: React.ReactElement;
};

const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div>
      <TopNavigationBar />
      {children}
      <BottomNavigationBar />
    </div>
  );
};

export default MainContainer;
