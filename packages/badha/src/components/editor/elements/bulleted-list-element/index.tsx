export const BulletedListElement = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <ul className="list-disc" style={{ width: "630px", marginBottom: "60px" }} {...props.attributes}>
        {props.children}
      </ul>
    </div>
    // <div className="flex items-center justify-center">
    //   <h1
    //     placeholder="asdasd"
    //     className=" font-mv-waheed font-bold"
    //     {...props.attributes}
    //     style={{ width: "680px", marginBottom: "60px", fontSize: "32px" }}
    //   >
    //     {props.children}
    //   </h1>
    // </div>
  );
};
