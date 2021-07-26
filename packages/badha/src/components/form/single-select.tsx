import { useField, Field, ErrorMessage, FieldHookConfig } from "formik";
import React from "react";

interface Options {
  id: number | string;
  name: string;
}

interface OtherProps {
  label?: string;
  options: Options[];
}

const SingleSelect = ({ label, ...props }: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  const { options } = props;

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
          as="select"
          className={`relative bg-transparent w-full rounded-md focus:ring-4 border-2 focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10  ${
            meta.touched && meta.error
              ? "border-red ring-red ring-opacity-40"
              : "border-black border-opacity-10	 placeholder-gray-400"
          }`}
        >
          <option>...</option>
          {/* <option defaultValue>...</option> */}

          {options.map((option: Record<string, any>) => (
            <option value={option.id} key={`tag_type_${option.id}`}>
              {option.name}
            </option>
          ))}
        </Field>

        <ErrorMessage name={props.name} className="mt-2 text-sm text-red" component="p" />
      </div>
    </div>
  );
};

export default SingleSelect;
