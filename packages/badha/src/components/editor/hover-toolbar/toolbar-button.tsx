const ToolBarButton = (props: any) => {
  const { icon, isActive, ...otherProps } = props;
  return (
    <button
      className={`rounded-md focus:shadow-button  focus:ring-offset-transparent focus:outline-none focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10 ${
        isActive ? "border-2 border-red text-white " : "bg-white"
      }`}
      {...otherProps}
    >
      <div className="w-11">{props.icon}</div>
    </button>
  );
};

export default ToolBarButton;
