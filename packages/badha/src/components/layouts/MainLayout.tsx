import React from "react";

import { text } from "../text";
import { Popover, SideMenu } from "../ui";

interface LayoutProps {
  children: React.ReactNode;
}
const MainLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Popover />
      <div className="flex content-container">
        <div style={{ width: "268px" }}>
          <SideMenu />
        </div>

        <main className="w-full overflow-scroll">
          {children}
          {/* <main className="md:bg-green-900 lg:bg-red sm:px-6 lg:px-8 py-10 relative lg:col-start-4 lg:col-span-8  xl:col-start-2 xl:col-span-12 "> */}
        </main>
      </div>
      {/* <div className="bg-yellow-200" style={{ width: "268px" }}>
        hello world
      </div>
      <div className="bg-white w-fullmim3282.myselves">{text}</div> */}
    </div>
    // <div className="bg-red min-h-screen">
    //   <Popover />
    //   <div className="flex flex-row h-screen bg-black" style={{ marginTop: "70px" }}>
    //     <div className="bg-green-500 border-r border-gray-200" style={{ width: "268px" }}>
    //       <SideMenu />
    //     </div>
    //     <div className="bg-gray-500 w-full h-screen max-h-screen overflow-scroll">
    //       <div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div className="min-h-screen bg-primary">
    //   <Popover />
    //   {/* <div className="py-10"> */}
    //   <div className="max-w-3xl mx-auto  lg:max-w-full lg:grid lg:grid-cols-12 custom-height">
    //     {/* <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-full lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8"> */}
    //
    //     {/* <main className="lg:col-span-9 xl:col-span-10 sm:px-6 lg:px-8 py-10 relative"> */}
    //
    //   </div>
    // </div>
    // </div>
  );
};

export default MainLayout;
