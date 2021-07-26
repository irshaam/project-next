export const ListItemElement = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <li style={{ width: "630px" }} {...props.attributes}>
        {props.children}
      </li>
    </div>
  );
};
