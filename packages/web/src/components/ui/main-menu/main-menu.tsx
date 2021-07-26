import CovidIcon from '../../../assets/svg/covid19-menu-icon.svg';

import MenuItem from './menu-item';

const MainMenu = () => {
  return (
    <nav className="flex justify-center items-center h-full">
      <MenuItem
        title="ކޮވިޑް-19"
        path="#"
        icon={
          <CovidIcon className="ml-2 fill-current stroke-current hover:fill-current hover:stroke-current" />
        }
      />
      <MenuItem title="ސައިންސް" path="#" />
      <MenuItem title="ޓެކްނެލޮޖީ" path="#" />
      <MenuItem title="ކުޅިވަރު" path="#" />
      <MenuItem title="ދުނިޔެ" path="#" />
    </nav>
  );
};

export default MainMenu;
