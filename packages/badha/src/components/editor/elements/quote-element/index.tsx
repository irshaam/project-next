export const QuoteElement = (props: any) => {
  return (
    <div className="flex items-center justify-center">
      <blockquote style={{ width: "630px" }} {...props.attributes}>
        <a href="#" className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900"> {props.children}</p>
            </div>
          </div>
        </a>
      </blockquote>
    </div>
  );
};
