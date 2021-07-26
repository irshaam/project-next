/**
 * Elements
 * @param props
 * @returns
 */
export const ParagraphElement = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <p {...props.attributes} style={{ width: "680px", marginBottom: "60px" }}>
        {props.children}
      </p>
    </div>
  );
};
