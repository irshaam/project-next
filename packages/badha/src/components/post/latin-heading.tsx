import { useField, Field, ErrorMessage, FieldHookConfig } from "formik";
import React from "react";

import { classNames } from "@utils";

interface OtherProps {
  label?: string;
}

const LatinHeading = ({ label, ...props }: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);

  const inputStyles = [
    "relative w-full px-0",
    "text-sm",
    "border-b-2 border-t-0 border-r-0 border-l-0",
    "bg-transparent",
    "h-10 leading-10",
    "focus:outline-none focus:ring-transparent focus:shadow-input",
    "focus:border-red focus:border-t-0 focus:border-r-0 focus:border-l-0 focus:border-opacity-20",
  ];
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between">
          <label
            htmlFor={props.name}
            className={`block text-right w-full text-sm font-medium text-gray-700 ${
              meta.touched && meta.error ? " text-red text-opacity-50" : "text-light-gray"
            }`}
          >
            {label}
          </label>
        </div>
      )}

      <div className="mt-1 relative rounded-md shadow-sm">
        <Field
          {...field}
          {...props}
          className={`${classNames(...inputStyles)} ${props.className && props.className} ${
            meta.touched && meta.error
              ? "border-red  ring-opacity-40"
              : "border-black border-opacity-10	 placeholder-gray-400"
          }`}
        />
        {/* {field.value && field.value.length > 0 && (
          <span
            className="inline-block px-2 py-1 text-xxs bg-gray-200 text-gray-700 absolute left-0 -top-2"
            id="email-optional"
          >
            Latin Heading
          </span>
        )} */}

        <ErrorMessage name={props.name} className="mt-2 text-sm text-red" component="p" />
      </div>
    </div>
  );
};

export default LatinHeading;
