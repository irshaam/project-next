import { css } from "@emotion/css";
import { useEffect, useRef } from "react";
import { Editor, Transforms, Element as SlateElement, Range } from "slate";
import { ReactEditor, useSlate, useSlateStatic } from "slate-react";

import Bold from "../icons/bold.svg";
import BulletList from "../icons/bullet-list.svg";
import Italic from "../icons/italic.svg";
import NumberList from "../icons/number-list.svg";
import Quote from "../icons/top-quote.svg";
import Underline from "../icons/underline.svg";
import { getActiveStyles, toggleStyle } from "../utils";

const CHARACTER_STYLES = [
  { name: "bold", icon: <Bold /> },
  { name: "italic", icon: <Italic /> },
  { name: "underline", icon: <Underline /> },
];

import { Button, Icon, Menu, Portal } from "./components";
import ToolbarButton from "./toolbar-button";

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const toggleBlock = (editor, format) => {
  console.log(format);
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(!Editor.isEditor(n) && SlateElement.isElement(n) && n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    // <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     strokeWidth={2}
    //     d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    //   />
    // </svg>;
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const HoverToolbar = ({ selection }: { selection: any }) => {
  const ref = useRef<any>();
  // const ref = useRef<HTMLDivElement | null>();
  const editor = useSlateStatic();

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #412c27;

          transition: opacity 0.75s;

          background: rgba(255, 255, 255, 1);
          box-shadow: 0 -10px 24px 0 rgba(223, 211, 192, 0.6);

          border-radius: 18px;
        `}
      >
        {CHARACTER_STYLES.map((style) => (
          <ToolbarButton
            key={style.name}
            icon={style.icon}
            isActive={getActiveStyles(editor).has(style.name)}
            onMouseDown={(event: any) => {
              event.preventDefault();
              toggleStyle(editor, style.name);
            }}
          />
        ))}

        <ToolbarButton
          key={`numbered-list`}
          icon={<NumberList />}
          isActive={getActiveStyles(editor).has("numbered-list")}
          onMouseDown={(event: any) => {
            event.preventDefault();
            toggleBlock(editor, "numbered-list");
          }}
        />
        <ToolbarButton
          key={`bulleted-list`}
          icon={<BulletList />}
          isActive={getActiveStyles(editor).has("bulleted-list")}
          onMouseDown={(event: any) => {
            event.preventDefault();
            toggleBlock(editor, "bulleted-list");
          }}
        />
        <ToolbarButton
          key={`block-quote`}
          icon={<Quote />}
          isActive={getActiveStyles(editor).has("block-quote")}
          onMouseDown={(event: any) => {
            event.preventDefault();
            toggleBlock(editor, "block-quote");
          }}
        />
      </Menu>
    </Portal>
  );
};
