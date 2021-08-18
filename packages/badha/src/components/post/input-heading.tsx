import { useField, Field, ErrorMessage, FieldHookConfig } from "formik";
import isHotkey from "is-hotkey";
import React, { SyntheticEvent } from "react";

import { classNames, getThaanaChar } from "../../utils";
import { _transFrom, _transToKbd } from "../../utils/thaanaKeyboard";
interface OtherProps {
  label?: string;
  maxLength?: number;
  maxRows?: number;
  title?: string;
}

const HeadingInput = ({ label, ...props }: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);

  // const handleKeyDown = (event: KeyboardEvent) => {
  //   const e = event;
  //   const target = e.target as HTMLInputElement;

  //   console.log(e);

  //   // Disable
  //   // if (e.key === "Enter") {
  //   //   e.preventDefault();
  //   // }

  //   // If MaxLength Allow Only Backspace
  //   if (props.maxLength && target.value.length >= props.maxLength && e.key != "Backspace") return;

  //   const transIndex = _transFrom.indexOf(e.key);

  //   // if (transIndex == -1 || e.ctrlKey || e.metaKey || isHotkey("mod+z", event) || isHotkey("shift+mod+z", event)) {
  //   //   return true;
  //   // }

  //   if (transIndex == -1 || e.ctrlKey || e.metaKey) return true;

  //   const transChar = _transToKbd.substr(transIndex, 1);
  //   e.preventDefault();

  //   // // Cancel default action for the key
  //   // if (typeof e.preventDefault == "function") {
  //   // } else {
  //   //   e.returnValue = false;
  //   // }

  //   // Lookup Translated Character
  //   const { selectionStart, selectionEnd, scrollTop } = target;

  //   console.log("start", selectionStart);
  //   console.log("end", selectionEnd);
  //   console.log("value", target.value);
  //   var sPos = scrollTop;

  //   if (selectionStart) {
  //     var selOld = selectionStart + 1;
  //     target.value =
  //       target.value.substring(0, selectionStart) +
  //       transChar +
  //       target.value.substring(Number(selectionEnd), target.value.length);
  //     // target.selectionStart = selectionStart;
  //     // target.selectionEnd = selectionEnd;
  //     // helpers.setValue(
  //     //   target.value.substring(0, selectionStart) +
  //     //     transChar +
  //     //     target.value.substring(Number(selectionEnd), target.value.length)
  //     // );
  //     // target.dispatchEvent(new Event("input", { bubbles: true }));
  //     target.setSelectionRange(selOld, selOld);
  //     target.focus();
  //   } else {
  //     target.value += transChar;
  //     // target.focus();
  //   }

  //   // if (target.selectionStart) {
  //   //   consto;
  //   // }

  //   // e.preventDefault();

  //   // const value =
  //   //   target.value.substring(0, selectionStart) + transChar + target.value.substring(selectionEnd, target.value.length);
  //   // helpers.setValue(value);
  //   // target.focus();
  //   return true;
  // };

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
    "border-b border-t-0 border-r-0 border-l-0 border-opacity-20 border-gray-400 border-dashed",
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

      <div className="mt-1 relative">
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

        {field.value && field.value.length > 0 && (
          <span className="inline-block px-2 py-1 text-xxs bg-gray-200 text-gray-700 absolute -top-3 left-0">
            {props.title}
          </span>
        )}
        <ErrorMessage name={props.name} className="mt-2 text-sm text-red" component="p" />
      </div>
    </div>
  );
};

export default HeadingInput;
