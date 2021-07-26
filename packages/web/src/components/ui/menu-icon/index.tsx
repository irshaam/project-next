const MenuIcon = () => {
  return (
    <button
      className="text-black w-10 h-10 relative focus:outline-none px-6 "
      onClick={(): void => toggleMenu((showMenu) => !showMenu)}
    >
      <div className="block w-5 absolute left-1/2 top-1/2   transform  -translate-y-1/2">
        <span
          aria-hidden="true"
          className={`${
            showMenu ? "rotate-25" : "-translate-y-1.5"
          }  block absolute  h-0.6  w-10 bg-current transform transition duration-500 ease-in-out`}
        />

        <span
          aria-hidden="true"
          className={`${
            showMenu ? "-rotate-25" : "translate-y-1.5"
          }  block absolute h-0.6  w-10 bg-current transform transition duration-500 ease-in-out`}
        />
      </div>
    </button>
  );
};

export default MenuIcon;
