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
    <div className={`w-full relative $ ${meta.touched && meta.error ? "mb-3" : "mb-6"}`}>
      {label && (
        <label
          htmlFor={props.name}
          className={`bg-rk-secondry z-10 -top-2 left-3 absolute text-sm px-2 ${
            meta.touched && meta.error ? " text-rk-red" : "text-rk-dark"
          }`}
        >
          {label}
        </label>
      )}
      <div />
      <Field
        {...field}
        {...props}
        className={`relative bg-transparent  px-4 py-4 w-full rounded-xl focus:ring-4 border-2 focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10  ${
          meta.touched && meta.error
            ? "border-red ring-red ring-opacity-40"
            : "border-black border-opacity-10	 placeholder-gray-400"
        }`}
      />
      <ErrorMessage name={props.name} className="text-red text-sm" component="span" />
    </div>
  );
};

export default TextInput;
