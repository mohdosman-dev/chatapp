import { Outlet } from "react-router";

const BaseLayout = () => {
  return (
    <div className="flex flex-col w-full h-auto">
      <div className="flex items-center justify-center w-full -h-full">
        <div className="w-full mx-auto h-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
