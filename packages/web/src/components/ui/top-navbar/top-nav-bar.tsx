import { useState } from "react";

import MainLogo from "../../../assets/svg/main-logo.svg";

import { MainMenu, MainMenuIcon } from "@ui";
import ProfileDropdown from "@ui/profile-dropdown";
import Search from "@ui/search";
import UserrNotification from "@ui/user-notification";

const TopNavBar = () => {
  const [showMenu, toggleMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    toggleMenu((showMenu) => !showMenu);
  };
  return (
    <div className="h-20 grid grid-cols-12 gap-10 border-b-2 border-black border-opacity-5 px-10">
      <div className="h-20 col-span-2 flex items-center">
        <div className="h-full flex items-center ">
          <div className="ml-8 ">
            <MainMenuIcon showMenu={showMenu} toggleMenu={handleToggleMenu} />
          </div>
          <MainLogo />
        </div>
      </div>
      <div className="h-20 col-span-8">
        <MainMenu />
      </div>
      <div className="h-20 col-span-2 flex items-center justify-end">
        <Search />
        <UserrNotification />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default TopNavBar;
