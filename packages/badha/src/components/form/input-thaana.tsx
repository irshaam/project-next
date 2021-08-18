import { useField, Field, ErrorMessage, FieldHookConfig } from "formik";
import React, { SyntheticEvent } from "react";

import { translateToThaana } from "../../utils/thaanaKeyboard";
interface OtherProps {
  label?: string;
}

const ThaanaInput = ({ label, ...props }: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);

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

      <div className="mt-1 relative rounded-md shadow-sm">
        <Field
          {...field}
          {...props}
          onInput={(event: SyntheticEvent) => translateToThaana(event)}
          className={`bg-white relative thaana  font-mv-typewriter bg-transparent w-full rounded-md focus:ring-4 border-2 focus:border-red-next focus:border-opacity-20 focus:ring-red-next focus:ring-opacity-10  ${
            meta.touched && meta.error
              ? "border-red-next ring-red-next ring-opacity-40"
              : "border-black border-opacity-10	 placeholder-gray-400"
          }`}
        />

        <ErrorMessage name={props.name} className="mt-2 text-sm text-red-next" component="p" />
      </div>
    </div>
  );
};

export default ThaanaInput;
