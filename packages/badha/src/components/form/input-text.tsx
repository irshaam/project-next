import { useField, Field, ErrorMessage, FieldHookConfig } from "formik";
import React from "react";

interface OtherProps {
  label?: string;
}

const TextInput: React.FC<OtherProps & FieldHookConfig<string>> = ({
  label,
  ...props
}: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between">
          <label
            htmlFor={props.name}
            className={`block text-sm font-medium text-gray-700 ${
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
          className={`relative bg-transparent w-full rounded-md focus:ring-4 border-2 focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10  ${
            meta.touched && meta.error
              ? "border-red ring-red ring-opacity-40"
              : "border-black border-opacity-10	 placeholder-gray-400"
          }`}
        />

        <ErrorMessage name={props.name} className="mt-2 text-sm text-red" component="p" />
      </div>
    </div>
  );
};

export default TextInput;
