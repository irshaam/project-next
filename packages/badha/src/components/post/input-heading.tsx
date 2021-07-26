import { useField, Field, ErrorMessage, FieldHookConfig } from "formik";
import React, { SyntheticEvent } from "react";

import { classNames, getThaanaChar } from "../../utils";
import { isTranslatable } from "../../utils/thaanaKeyboard";
interface OtherProps {
  label?: string;
  maxLength?: number;
  maxRows?: number;
  title?: string;
}

const _transFrom = "qwertyuiop[]\\asdfghjkl;'zxcvbnm,./QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?()";
const _transToKbd = "ްއެރތޔުިޮޕ][\\ަސދފގހޖކލ؛'ޒ×ޗވބނމ،./ޤޢޭޜޓޠޫީޯ÷}{|ާށޑﷲޣޙޛޚޅ:\"ޡޘޝޥޞޏޟ><؟)(";

const HeadingInput = ({ label, ...props }: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);

  const handleKeyDown = (event: KeyboardEvent) => {
    const e = event;
    const target = e.target as HTMLInputElement;

    // Disable
    if (e.key === "Enter") {
      e.preventDefault();
    }

    // If MaxLength Allow Only Backspace
    if (props.maxLength && target.value.length >= props.maxLength && e.key != "Backspace") return;

    const selectionStart: number = target.selectionStart as number;
    const selectionEnd: number = target.selectionEnd as number;
    var transIndex = _transFrom.indexOf(e.key);

    if (transIndex == -1 || e.ctrlKey || e.metaKey) return true;

    var transChar = _transToKbd.substr(transIndex, 1);

    e.preventDefault();

    const value =
      target.value.substring(0, selectionStart) + transChar + target.value.substring(selectionEnd, target.value.length);
    helpers.setValue(value);
    target.dispatchEvent(new Event("input", { bubbles: true }));
    target.focus();
  };

  const handleInput = (event: KeyboardEvent) => {
    // const e = event;
    // console.log(e);
    // const target = e.target as HTMLInputElement;
    // // Check for CTRL modifier key
    // var transIndex = _transFrom.indexOf(e.key);
    // if (transIndex == -1 || e.ctrlKey) return true;
    // var transChar = _transToKbd.substr(transIndex, 1);
    // const selectionStart: number = target.selectionStart as number;
    // const selectionEnd: number = target.selectionEnd as number;
    // e.preventDefault();
    // // if ("insertText" !== e.inputType) return;
    // target.value =
    //   target.value.substring(0, selectionStart) + transChar + target.value.substring(selectionEnd, target.value.length);
    // helpers.setValue(target.value);
    // if (!e.data) return;
    // const newCharInput = getThaanaChar(e.data);
    // const selectionStart: number = target.selectionStart as number;
    // const selectionEnd: number = target.selectionEnd as number;
    // handle "spacebar"
    // if (" " === newCharInput) return;
    // // remove the original latin char
    // target.value = target.value.split(e.data).join("");
    // // insert the new char where the cursor was at
    // let newValue = target.value.substring(0, selectionStart - 1);
    // newValue += newCharInput;
    // newValue += target.value.substring(selectionStart - 1);
    // target.value = newValue;
    // // maintain cursor location
    // target.selectionStart = selectionStart;
    // target.selectionEnd = selectionEnd;
  };
  const inputStyles = [
    "relative bg-transparent w-full",
    "thaana",
    "border-b border-t-0 border-r-0 border-l-0 border-opacity-10 border-gray-400",
    "focus:outline-none focus:ring-transparent focus:shadow-input",
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

      <div className="mt-1 relative rounded-md shadow-sm">
        <Field
          {...field}
          {...props}
          onKeyDown={handleKeyDown}
          className={`${classNames(...inputStyles)} ${props.className && props.className} ${
            meta.touched && meta.error ? "border-red  ring-opacity-40" : "	 placeholder-gray-400"
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

export default HeadingInput;
