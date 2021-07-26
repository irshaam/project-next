import Link from "next/link";
import React from "react";

import Logo from "../../images/Logo.svg";
import { Popover, SideMenu } from "../ui";
interface LayoutProps {
  children: React.ReactNode;
}
const EditorLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-primary">
      {/* logo */}
      <div className="fixed left-0 flex items-center px-4" style={{ height: "70px" }}>
        <Link href="/">
          <a>
            <Logo className="fill-current text-red hover:text-black cursor-pointer transition-colors duration-500 ease-in-out" />
          </a>
        </Link>
      </div>
      {/* eof logo */}
      <main className="min-h-screen flex justify-center">{children}</main>
    </div>
  );
};

export default EditorLayout;
