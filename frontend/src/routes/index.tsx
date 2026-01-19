import { Route, Routes } from "react-router";
import BaseLayout from "../layouts/base-layout";
import AppLayout from "../layouts/app-layout";
import { authRoutePaths, protectedRoutePaths } from "./routes";
import RouteGaurd from "./routes-guard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* AUTH / PUBLIC ROUTES */}
      <Route path="/" element={<RouteGaurd requireAuth={false} />}>
        <Route element={<BaseLayout />}>
          {authRoutePaths.map((route: { path: string; element: any }) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>

      {/* PROTECTED ROUTES */}
      <Route path="/" element={<RouteGaurd requireAuth={true} />}>
        <Route element={<AppLayout />}>
          {protectedRoutePaths.map((route: { path: string; element: any }) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
