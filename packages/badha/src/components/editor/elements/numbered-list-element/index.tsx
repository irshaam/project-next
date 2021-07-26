export const NumberedListElement = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <ul className="list-decimal" style={{ width: "630px", marginBottom: "60px" }} {...props.attributes}>
        {props.children}
      </ul>
    </div>
  );
};
