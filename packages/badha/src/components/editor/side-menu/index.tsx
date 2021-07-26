/* eslint-disable react/display-name */
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { forwardRef, useState } from "react";
import { Transforms, Editor } from "slate";
import { useSlateStatic, useFocused, useSelected } from "slate-react";

import { CustomElement } from "../index";

import MenuItem from "./menu-item";
const SideMenu = forwardRef((props: any, ref: any) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setOpen((open) => !open);
  };

  const editor = useSlateStatic();
  const focused = useFocused();
  const selected = useSelected();

  const addNode = () => {
    console.log("adding new node");

    // Transforms.setNodes(props.editor, { type: "heading", children: [{ text: "..." }] } as CustomElement, {
    //   at: props.selection,
    // });
    Transforms.insertNodes(props.editor, { type: "heading", children: [{ text: "" }] } as CustomElement, {
      at: props.previousSelection,
      select: true,
    });

    // Transforms.console.log(props);

    // Transforms.insertNodes(editor, heading);
  };

  return (
    <div
      ref={ref}
      className="flex items-start absolute z-50"
      style={{ marginLeft: "-32px", left: "-100000px", top: "-100000px" }}
    >
      <button
        type="button"
        onClick={toggleMenu}
        className="text-gray-400 hover:text-red transition-colors delay-75 ease-linear focus:outline-none"
      >
        {open ? (
          <XCircleIcon className=" h-8 w-8" aria-hidden="true" />
        ) : (
          <PlusCircleIcon className=" h-8 w-8" aria-hidden="true" />
        )}
      </button>
      {open && (
        <div
          className="shadow px-4 py-2 sm:rounded-sm overflow-scroll "
          style={{ background: "#DBD2CD", width: "312px", maxHeight: "376px" }}
        >
          <div>
            <div className="text-xs font-bold text-gray-500 py-2">PRIMARY</div>
            <MenuItem addBlock={addNode} />
          </div>
        </div>
      )}
    </div>
  );
});

export default SideMenu;
