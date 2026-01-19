import React from "react";
import AppBar from "./app-bar";

interface AppWrapperProps {
  childeren: React.ReactNode;
}

const AppWrapper = ({ childeren }: AppWrapperProps) => {
  return (
    <div className="">
      {/* TOOLBAR */}
      <AppBar />
      <main>{childeren}</main>
    </div>
  );
};

export default AppWrapper;
