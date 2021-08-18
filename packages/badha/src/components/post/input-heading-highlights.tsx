import { useField, Field, ErrorMessage, FieldHookConfig } from "formik";
import React, { SyntheticEvent } from "react";

import { classNames, getThaanaChar } from "../../utils";
interface OtherProps {
  label?: string;
  maxLength?: number;
  maxRows?: number;
  title?: string;
}

const _transFrom = "qwertyuiop[]\\asdfghjkl;'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?()";
const _transToKbd = "ްއެރތޔުިޮޕ][\\ަސދފގހޖކލ؛'ޒ×ޗވބނމ،./ޤޢޭޜޓޠޫީޯ÷}{|ާށޑﷲޣޙޛޚޅ:\"ޡޘޝޥޞޏޟ><؟)(";

const HeadingHighlights = ({ label, ...props }: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);

  const inputStyles = [
    "relative bg-transparent w-full",
    "thaana",
    // "border-b border-t-0 border-r-0 border-l-0 border-opacity-10 border-gray-400",
    "focus:outline-none border-transparent border-none focus:ring-transparent focus:shadow-input",
    "focus:border-red focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:border-opacity-20",
  ];
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between">
          <label
            htmlFor={props.name}
            className={`block text-right w-full font-mv-typewriter text-sm font-medium text-gray-700 ${
              meta.touched && meta.error ? " text-red text-opacity-50" : "text-light-gray"
            }`}
          >
            {label}
          </label>

          {/* <span className="text-sm text-gray-500" id="email-optional">
            Optional
          </span> */}
        </div>
      )}

      <div className="mt-1 relative ">
        <Field
          {...field}
          {...props}
          className={`${classNames(...inputStyles)} ${props.className && props.className} ${
            meta.touched && meta.error ? "border-red  ring-opacity-0" : "	 placeholder-gray-400"
          }`}

          // onInput={handleInput}

          // var transIndex = _transFrom.indexOf(event.key);
          // If pressed does not require translation, let default actions proceed
          // if (transIndex == -1) return true;
          // const transChar = _transToKbd.substr(transIndex, 1);
          // event.preventDefault();

          // helpers.setValue(event.target.value + transChar);
          // }}
          // className={` outline-none relative thaana font-mv-waheed text-3xl border-b-2 border-t-0  border-r-0 border-l-0 focus:border-t-0  focus:border-r-0 focus:border-l-0 bg-transparent w-full rounded-md focus:ring-4  focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10  ${
          //   // className={` outline-none relative thaana font-mv-waheed text-3xl border-b-2 border-t-0  border-r-0 border-l-0 focus:border-t-0  focus:border-r-0 focus:border-l-0 bg-transparent w-full rounded-md focus:ring-4  focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10  ${
          //   meta.touched && meta.error
          //     ? "border-red ring-red ring-opacity-40"
          //     : "border-black border-opacity-10	 placeholder-gray-400"
          // }`}
        />
        {/*
        {field.value && field.value.length > 0 && (
          <span className="inline-block px-2 py-1 text-xxs bg-gray-200 text-gray-700 absolute -top-1 left-0">
            {props.title}
          </span>
        )} */}
        <ErrorMessage name={props.name} className="mt-2 text-sm text-red" component="p" />
      </div>
    </div>
  );
};

export default HeadingHighlights;
