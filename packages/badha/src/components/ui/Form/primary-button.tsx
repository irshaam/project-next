import { useField, Field, ErrorMessage, FieldHookConfig } from "formik";
import React from "react";

const PrimaryButton: React.FC<any> = ({ label, ...props }) => {
  return (
    <button
      {...props}
      className={`${props.className} bg-red w-full text-white font-medium py-4 rounded-xl focus:shadow-button  focus:ring-offset-transparent focus:outline-none focus:border-red focus:border-opacity-20 focus:ring-red focus:ring-opacity-10  `}
      // className={`${props.className} w-full inline-flex items-center justify-center tracking-normal uppercase px-6 py-4 border border-transparent text-sm font-semibold rounded-sm shadow-sm text-white bg-rk-dark hover:bg-rk-dark-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rk-primary  active:text-white`}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;

// background: #FF3800;
// box-shadow: 0 10px 30px 0 rgba(255,56,0,0.40);
// border-radius: 12px;
