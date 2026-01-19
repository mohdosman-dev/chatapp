import React from "react";
import { Outlet } from "react-router";

interface RouteGaurdProps {
  requireAuth: boolean;
}

const RouteGaurd = ({ requireAuth }: RouteGaurdProps) => {
  return <div>{<Outlet />}</div>;
};

export default RouteGaurd;
