import Image from "next/image";

import QuoteIcon from "./icon.svg";
import profilePic from "./Oval.png";
export const QuoteElement = (props: any) => {
  return (
    <div className="flex items-center justify-center" style={{ marginBottom: "90px", marginTop: "90px" }}>
      <blockquote {...props.attributes} style={{ width: "1160px", marginBottom: "60px", fontSize: "32px" }}>
        <div className="w-full grid grid-cols-10">
          <div className="col-span-3 relative" contentEditable={false}>
            <QuoteIcon className="w-28 absolute z-10 -top-4 -right-10" />
            <Image src={profilePic} alt="Picture of the author" />
          </div>
          <div className="col-span-7">
            <p
              className="font-mv-waheed"
              style={{
                fontSize: "70px",
                color: "#000000",
                // text-align: right;
                lineHeight: "80px",
              }}
            >
              {props.children}
            </p>
          </div>
        </div>
      </blockquote>
    </div>
  );
};
