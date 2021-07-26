export const LinkElement = (props: any) => {
  return (
    <a href={props.element.url} {...props.attributes} className={"link underline text-blue-400 hover:text-blue-500"}>
      {props.children}
    </a>
  );
};
